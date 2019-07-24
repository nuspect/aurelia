import { DI, PLATFORM, Profiler, Registration } from '@aurelia/kernel';
import { IActivator } from './activator';
import { INode } from './dom';
import { ILifecycle, } from './lifecycle';
import { ContinuationTask, LifecycleTask, } from './lifecycle-task';
import { CustomElement } from './resources/custom-element';
import { Controller } from './templating/controller';
const { enter: enterStart, leave: leaveStart } = Profiler.createTimer('Aurelia.start');
const { enter: enterStop, leave: leaveStop } = Profiler.createTimer('Aurelia.stop');
export class CompositionRoot {
    constructor(config, container) {
        this.config = config;
        if (config.host != void 0) {
            if (container.has(INode, false)) {
                this.container = container.createChild();
            }
            else {
                this.container = container;
            }
            Registration.instance(INode, config.host).register(this.container);
            this.host = config.host;
        }
        else if (container.has(INode, true)) {
            this.container = container;
            this.host = container.get(INode);
        }
        else {
            throw new Error(`No host element found.`);
        }
        this.strategy = config.strategy != void 0 ? config.strategy : 1 /* getterSetter */;
        const initializer = this.container.get(IDOMInitializer);
        this.dom = initializer.initialize(config);
        this.viewModel = CustomElement.isType(config.component)
            ? this.container.get(config.component)
            : config.component;
        this.controller = Controller.forCustomElement(this.viewModel, this.container, this.host, this.strategy);
        this.lifecycle = this.container.get(ILifecycle);
        this.activator = this.container.get(IActivator);
        if (config.enableTimeSlicing === true) {
            this.lifecycle.enableTimeslicing(config.adaptiveTimeSlicing);
        }
        else {
            this.lifecycle.disableTimeslicing();
        }
        this.task = LifecycleTask.done;
        this.hasPendingStartFrame = true;
        this.hasPendingStopFrame = true;
    }
    activate(antecedent) {
        const { task, host, viewModel, container, activator, strategy } = this;
        const flags = strategy | 1024 /* fromStartTask */;
        if (task.done) {
            if (antecedent == void 0 || antecedent.done) {
                this.task = activator.activate(host, viewModel, container, flags, void 0);
            }
            else {
                this.task = new ContinuationTask(antecedent, activator.activate, activator, host, viewModel, container, flags, void 0);
            }
        }
        else {
            if (antecedent == void 0 || antecedent.done) {
                this.task = new ContinuationTask(task, activator.activate, activator, host, viewModel, container, flags, void 0);
            }
            else {
                const combinedAntecedent = new ContinuationTask(task, antecedent.wait, antecedent);
                this.task = new ContinuationTask(combinedAntecedent, activator.activate, activator, host, viewModel, container, flags, void 0);
            }
        }
        return this.task;
    }
    deactivate(antecedent) {
        const { task, viewModel, activator, strategy } = this;
        const flags = strategy | 2048 /* fromStopTask */;
        if (task.done) {
            if (antecedent == void 0 || antecedent.done) {
                this.task = activator.deactivate(viewModel, flags);
            }
            else {
                this.task = new ContinuationTask(antecedent, activator.deactivate, activator, viewModel, flags);
            }
        }
        else {
            if (antecedent == void 0 || antecedent.done) {
                this.task = new ContinuationTask(task, activator.deactivate, activator, viewModel, flags);
            }
            else {
                const combinedAntecedent = new ContinuationTask(task, antecedent.wait, antecedent);
                this.task = new ContinuationTask(combinedAntecedent, activator.deactivate, activator, viewModel, flags);
            }
        }
        return this.task;
    }
}
export class Aurelia {
    constructor(container = DI.createContainer()) {
        this.container = container;
        this.task = LifecycleTask.done;
        this._isRunning = false;
        this._isStarting = false;
        this._isStopping = false;
        this._root = void 0;
        this.next = (void 0);
        Registration.instance(Aurelia, this).register(container);
    }
    get isRunning() {
        return this._isRunning;
    }
    get isStarting() {
        return this._isStarting;
    }
    get isStopping() {
        return this._isStopping;
    }
    get root() {
        if (this._root == void 0) {
            if (this.next == void 0) {
                throw new Error(`root is not defined`); // TODO: create error code
            }
            return this.next;
        }
        return this._root;
    }
    register(...params) {
        this.container.register(...params);
        return this;
    }
    app(config) {
        this.next = new CompositionRoot(config, this.container);
        if (this.isRunning) {
            this.start();
        }
        return this;
    }
    start(root = this.next) {
        if (root == void 0) {
            throw new Error(`There is no composition root`); // TODO: create error code
        }
        this.stop(root);
        if (this.task.done) {
            this.onBeforeStart(root);
        }
        else {
            this.task = new ContinuationTask(this.task, this.onBeforeStart, this, root);
        }
        this.task = this.root.activate(this.task);
        if (this.task.done) {
            this.task = this.onAfterStart(root);
        }
        else {
            this.task = new ContinuationTask(this.task, this.onAfterStart, this, root);
        }
        return this.task;
    }
    stop(root = this._root) {
        if (this._isRunning && root != void 0) {
            if (this.task.done) {
                this.onBeforeStop(root);
            }
            else {
                this.task = new ContinuationTask(this.task, this.onBeforeStop, this, root);
            }
            this.task = root.deactivate(this.task);
            if (this.task.done) {
                this.task = this.onAfterStop(root);
            }
            else {
                this.task = new ContinuationTask(this.task, this.onAfterStop, this, root);
            }
        }
        return this.task;
    }
    wait() {
        return this.task.wait();
    }
    onBeforeStart(root) {
        Reflect.set(root.host, '$au', this);
        this._root = root;
        this._isStarting = true;
    }
    onAfterStart(root) {
        this._isRunning = true;
        this._isStarting = false;
        this.dispatchEvent(root, 'aurelia-composed', root.dom);
        this.dispatchEvent(root, 'au-started', root.host);
        return LifecycleTask.done;
    }
    onBeforeStop(root) {
        this._isRunning = false;
        this._isStopping = true;
    }
    onAfterStop(root) {
        Reflect.deleteProperty(root.host, '$au');
        this._root = void 0;
        this._isStopping = false;
        this.dispatchEvent(root, 'au-stopped', root.host);
        return LifecycleTask.done;
    }
    dispatchEvent(root, name, target) {
        target = 'dispatchEvent' in target ? target : root.dom;
        target.dispatchEvent(root.dom.createCustomEvent(name, { detail: this, bubbles: true, cancelable: true }));
    }
}
PLATFORM.global.Aurelia = Aurelia;
export const IDOMInitializer = DI.createInterface('IDOMInitializer').noDefault();
//# sourceMappingURL=aurelia.js.map