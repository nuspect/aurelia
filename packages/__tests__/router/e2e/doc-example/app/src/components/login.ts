import { inject } from '@aurelia/kernel';
import { customElement, ICustomElementType } from '@aurelia/runtime';
import { IRouter, ViewportInstruction } from '@aurelia/router';
import { State } from '../state';

@customElement({
  name: 'login', template: `
<div class="login">
  <p>You need to be logged in to continue.</p>
  <button data-test="login-button" click.trigger="login()">Okay, log me in</button>
</div>` })
@inject(State, IRouter)
export class Login {
  constructor(private readonly state: State, private readonly router: IRouter) { }

  public login() {
    this.state.loggedIn = true;
    this.state.timedOut = false;
    this.state.loggedInAt = new Date();
    const instructions = this.state.loginReturnTo.length ? this.state.loginReturnTo : [new ViewportInstruction('main', 'gate')];
    const goto = this.router.instructionResolver.stringifyViewportInstructions(instructions);
    console.log(goto);
    this.state.loginReturnTo = [];
    this.router.replace(goto);
  }
}
export interface Login extends ICustomElementType { }
