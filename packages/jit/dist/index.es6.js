import { DI, Registration, Reporter, inject, PLATFORM } from '@aurelia/kernel';
import { BindingMode, DelegationStrategy, IExpressionParser, AccessKeyed, AccessMember, AccessScope, AccessThis, ArrayBindingPattern, ArrayLiteral, Assign, Binary, BindingBehavior, BindingIdentifier, CallFunction, CallMember, CallScope, Conditional, ForOfStatement, Interpolation, ObjectBindingPattern, ObjectLiteral, PrimitiveLiteral, TaggedTemplate, Template, Unary, ValueConverter, DOM, CustomAttributeResource, CustomElementResource, ViewCompileFlags, AttrBindingBehavior, Compose, DebounceBindingBehavior, Else, FromViewBindingBehavior, If, ITemplateCompiler, OneTimeBindingBehavior, Repeat, Replaceable, SanitizeValueConverter, SelfBindingBehavior, SignalBindingBehavior, ThrottleBindingBehavior, ToViewBindingBehavior, TwoWayBindingBehavior, UpdateTriggerBindingBehavior, With } from '@aurelia/runtime';

class AttrSyntax {
    constructor(rawName, rawValue, target, command) {
        this.rawName = rawName;
        this.rawValue = rawValue;
        this.target = target;
        this.command = command;
    }
}
const IAttributeParser = DI.createInterface()
    .withDefault(x => x.singleton(AttributeParser));
/*@internal*/
class AttributeParser {
    constructor() {
        this.cache = {};
    }
    parse(name, value) {
        let target;
        let command;
        const existing = this.cache[name];
        if (existing === undefined) {
            let lastIndex = 0;
            target = name;
            for (let i = 0, ii = name.length; i < ii; ++i) {
                if (name.charCodeAt(i) === 46 /* Dot */) {
                    // set the targetName to only the part that comes before the first dot
                    if (name === target) {
                        target = name.slice(0, i);
                    }
                    lastIndex = i;
                }
            }
            command = lastIndex > 0 ? name.slice(lastIndex + 1) : null;
            this.cache[name] = [target, command];
        }
        else {
            target = existing[0];
            command = existing[1];
        }
        return new AttrSyntax(name, value, target, command && command.length ? command : null);
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// tslint:disable:no-reserved-keywords
// tslint:disable:no-any
class TextBindingInstruction {
    constructor(from) {
        this.from = from;
        this.type = "a" /* textBinding */;
    }
}
class InterpolationInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "b" /* interpolation */;
    }
}
class OneTimeBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "c" /* propertyBinding */;
        this.oneTime = true;
        this.mode = BindingMode.oneTime;
    }
}
class ToViewBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "c" /* propertyBinding */;
        this.oneTime = false;
        this.mode = BindingMode.toView;
    }
}
class FromViewBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "c" /* propertyBinding */;
        this.oneTime = false;
        this.mode = BindingMode.fromView;
    }
}
class TwoWayBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "c" /* propertyBinding */;
        this.oneTime = false;
        this.mode = BindingMode.twoWay;
    }
}
class IteratorBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "d" /* iteratorBinding */;
    }
}
class TriggerBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "e" /* listenerBinding */;
        this.strategy = DelegationStrategy.none;
        this.preventDefault = true;
    }
}
class DelegateBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "e" /* listenerBinding */;
        this.strategy = DelegationStrategy.bubbling;
        this.preventDefault = false;
    }
}
class CaptureBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "e" /* listenerBinding */;
        this.strategy = DelegationStrategy.capturing;
        this.preventDefault = false;
    }
}
class CallBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "f" /* callBinding */;
    }
}
class RefBindingInstruction {
    constructor(from) {
        this.from = from;
        this.type = "g" /* refBinding */;
    }
}
class StylePropertyBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "h" /* stylePropertyBinding */;
    }
}
class SetPropertyInstruction {
    constructor(value, to) {
        this.value = value;
        this.to = to;
        this.type = "i" /* setProperty */;
    }
}
class SetAttributeInstruction {
    constructor(value, to) {
        this.value = value;
        this.to = to;
        this.type = "j" /* setAttribute */;
    }
}
class HydrateElementInstruction {
    constructor(res, instructions, parts, contentOverride) {
        this.res = res;
        this.instructions = instructions;
        this.parts = parts;
        this.contentOverride = contentOverride;
        this.type = "k" /* hydrateElement */;
    }
}
class HydrateAttributeInstruction {
    constructor(res, instructions) {
        this.res = res;
        this.instructions = instructions;
        this.type = "l" /* hydrateAttribute */;
    }
}
class HydrateTemplateController {
    constructor(def, res, instructions, link) {
        this.def = def;
        this.res = res;
        this.instructions = instructions;
        this.link = link;
        this.type = "m" /* hydrateTemplateController */;
    }
}
class LetElementInstruction {
    constructor(instructions, toViewModel) {
        this.instructions = instructions;
        this.toViewModel = toViewModel;
        this.type = "n" /* letElement */;
    }
}
class LetBindingInstruction {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.type = "o" /* letBinding */;
    }
}

function bindingCommand(nameOrSource) {
    return function (target) {
        return BindingCommandResource.define(nameOrSource, target);
    };
}
const BindingCommandResource = {
    name: 'binding-command',
    keyFrom(name) {
        return `${this.name}:${name}`;
    },
    isType(type) {
        return type.kind === this;
    },
    define(nameOrSource, ctor) {
        const description = typeof nameOrSource === 'string' ? { name: nameOrSource, target: null } : nameOrSource;
        const Type = ctor;
        Type.kind = BindingCommandResource;
        Type.description = description;
        Type.register = function (container) {
            container.register(Registration.singleton(Type.kind.keyFrom(description.name), Type));
        };
        const proto = Type.prototype;
        proto.handles = proto.handles || defaultHandles;
        return Type;
    }
};
function defaultHandles($symbol) {
    return !$symbol.isTemplateController;
}
let OneTimeBindingCommand = class OneTimeBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new OneTimeBindingInstruction(this.parser.parse($symbol.rawValue, 49 /* OneTimeCommand */), $symbol.to);
    }
};
OneTimeBindingCommand.inject = [IExpressionParser];
OneTimeBindingCommand = __decorate([
    bindingCommand('one-time')
], OneTimeBindingCommand);
let ToViewBindingCommand = class ToViewBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new ToViewBindingInstruction(this.parser.parse($symbol.rawValue, 50 /* ToViewCommand */), $symbol.to);
    }
};
ToViewBindingCommand.inject = [IExpressionParser];
ToViewBindingCommand = __decorate([
    bindingCommand('to-view')
], ToViewBindingCommand);
let FromViewBindingCommand = class FromViewBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new FromViewBindingInstruction(this.parser.parse($symbol.rawValue, 51 /* FromViewCommand */), $symbol.to);
    }
};
FromViewBindingCommand.inject = [IExpressionParser];
FromViewBindingCommand = __decorate([
    bindingCommand('from-view')
], FromViewBindingCommand);
let TwoWayBindingCommand = class TwoWayBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new TwoWayBindingInstruction(this.parser.parse($symbol.rawValue, 52 /* TwoWayCommand */), $symbol.to);
    }
};
TwoWayBindingCommand.inject = [IExpressionParser];
TwoWayBindingCommand = __decorate([
    bindingCommand('two-way')
], TwoWayBindingCommand);
// Not bothering to throw on non-existing modes, should never happen anyway.
// Keeping all array elements of the same type for better optimizeability.
const compileMode = ['', '$1', '$2', '', '$4', '', '$6'];
let DefaultBindingCommand = class DefaultBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return this[compileMode[$symbol.mode]]($symbol);
    }
};
DefaultBindingCommand.inject = [IExpressionParser];
DefaultBindingCommand = __decorate([
    bindingCommand('bind')
], DefaultBindingCommand);
DefaultBindingCommand.prototype.$1 = OneTimeBindingCommand.prototype.compile;
DefaultBindingCommand.prototype.$2 = ToViewBindingCommand.prototype.compile;
DefaultBindingCommand.prototype.$4 = FromViewBindingCommand.prototype.compile;
DefaultBindingCommand.prototype.$6 = TwoWayBindingCommand.prototype.compile;
let TriggerBindingCommand = class TriggerBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new TriggerBindingInstruction(this.parser.parse($symbol.rawValue, 86 /* TriggerCommand */), $symbol.to);
    }
};
TriggerBindingCommand.inject = [IExpressionParser];
TriggerBindingCommand = __decorate([
    bindingCommand('trigger')
], TriggerBindingCommand);
let DelegateBindingCommand = class DelegateBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new DelegateBindingInstruction(this.parser.parse($symbol.rawValue, 88 /* DelegateCommand */), $symbol.to);
    }
};
DelegateBindingCommand.inject = [IExpressionParser];
DelegateBindingCommand = __decorate([
    bindingCommand('delegate')
], DelegateBindingCommand);
let CaptureBindingCommand = class CaptureBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new CaptureBindingInstruction(this.parser.parse($symbol.rawValue, 87 /* CaptureCommand */), $symbol.to);
    }
};
CaptureBindingCommand.inject = [IExpressionParser];
CaptureBindingCommand = __decorate([
    bindingCommand('capture')
], CaptureBindingCommand);
let CallBindingCommand = class CallBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        return new CallBindingInstruction(this.parser.parse($symbol.rawValue, 153 /* CallCommand */), $symbol.to);
    }
};
CallBindingCommand.inject = [IExpressionParser];
CallBindingCommand = __decorate([
    bindingCommand('call')
], CallBindingCommand);
let ForBindingCommand = class ForBindingCommand {
    constructor(parser) {
        this.parser = parser;
    }
    compile($symbol) {
        const def = {
            name: 'repeat',
            template: $symbol.$element.node,
            instructions: []
        };
        return new HydrateTemplateController(def, 'repeat', [
            new IteratorBindingInstruction(this.parser.parse($symbol.rawValue, 539 /* ForCommand */), 'items'),
            new SetPropertyInstruction('item', 'local')
            // tslint:disable-next-line:align
        ], false);
    }
    handles($symbol) {
        return $symbol.target === 'repeat';
    }
};
ForBindingCommand.inject = [IExpressionParser];
ForBindingCommand = __decorate([
    bindingCommand('for')
], ForBindingCommand);

/*@internal*/
function unescapeCode(code) {
    switch (code) {
        case 98 /* LowerB */: return 8 /* Backspace */;
        case 116 /* LowerT */: return 9 /* Tab */;
        case 110 /* LowerN */: return 10 /* LineFeed */;
        case 118 /* LowerV */: return 11 /* VerticalTab */;
        case 102 /* LowerF */: return 12 /* FormFeed */;
        case 114 /* LowerR */: return 13 /* CarriageReturn */;
        case 34 /* DoubleQuote */: return 34 /* DoubleQuote */;
        case 39 /* SingleQuote */: return 39 /* SingleQuote */;
        case 92 /* Backslash */: return 92 /* Backslash */;
        default: return code;
    }
}

// tslint:disable:no-non-null-assertion
const ParserRegistration = {
    register(container) {
        container.registerTransformer(IExpressionParser, parser => {
            parser['parseCore'] = parseCore;
            return parser;
        });
    }
};
const $false = PrimitiveLiteral.$false;
const $true = PrimitiveLiteral.$true;
const $null = PrimitiveLiteral.$null;
const $undefined = PrimitiveLiteral.$undefined;
const $this = AccessThis.$this;
const $parent = AccessThis.$parent;
/*@internal*/
class ParserState {
    get tokenRaw() {
        return this.input.slice(this.startIndex, this.index);
    }
    constructor(input) {
        this.index = 0;
        this.startIndex = 0;
        this.lastIndex = 0;
        this.input = input;
        this.length = input.length;
        this.currentToken = 1572864 /* EOF */;
        this.tokenValue = '';
        this.currentChar = input.charCodeAt(0);
        this.assignable = true;
    }
}
const $state = new ParserState('');
/*@internal*/
function parseCore(input, bindingType) {
    $state.input = input;
    $state.length = input.length;
    $state.index = 0;
    $state.currentChar = input.charCodeAt(0);
    return parse($state, 0 /* Reset */, 61 /* Variadic */, bindingType === undefined ? 53 /* BindCommand */ : bindingType);
}
/*@internal*/
function parse(state, access, minPrecedence, bindingType) {
    if (state.index === 0) {
        if (bindingType & 2048 /* Interpolation */) {
            // tslint:disable-next-line:no-any
            return parseInterpolation(state);
        }
        nextToken(state);
        if (state.currentToken & 1048576 /* ExpressionTerminal */) {
            throw Reporter.error(100 /* InvalidExpressionStart */, { state });
        }
    }
    state.assignable = 448 /* Binary */ > minPrecedence;
    let result = undefined;
    if (state.currentToken & 32768 /* UnaryOp */) {
        /** parseUnaryExpression
         * https://tc39.github.io/ecma262/#sec-unary-operators
         *
         * UnaryExpression :
         *   1. LeftHandSideExpression
         *   2. void UnaryExpression
         *   3. typeof UnaryExpression
         *   4. + UnaryExpression
         *   5. - UnaryExpression
         *   6. ! UnaryExpression
         *
         * IsValidAssignmentTarget
         *   2,3,4,5,6 = false
         *   1 = see parseLeftHandSideExpression
         *
         * Note: technically we should throw on ++ / -- / +++ / ---, but there's nothing to gain from that
         */
        const op = TokenValues[state.currentToken & 63 /* Type */];
        nextToken(state);
        result = new Unary(op, parse(state, access, 449 /* LeftHandSide */, bindingType));
        state.assignable = false;
    }
    else {
        /** parsePrimaryExpression
         * https://tc39.github.io/ecma262/#sec-primary-expression
         *
         * PrimaryExpression :
         *   1. this
         *   2. IdentifierName
         *   3. Literal
         *   4. ArrayLiteral
         *   5. ObjectLiteral
         *   6. TemplateLiteral
         *   7. ParenthesizedExpression
         *
         * Literal :
         *    NullLiteral
         *    BooleanLiteral
         *    NumericLiteral
         *    StringLiteral
         *
         * ParenthesizedExpression :
         *   ( AssignmentExpression )
         *
         * IsValidAssignmentTarget
         *   1,3,4,5,6,7 = false
         *   2 = true
         */
        primary: switch (state.currentToken) {
            case 3077 /* ParentScope */: // $parent
                state.assignable = false;
                do {
                    nextToken(state);
                    access++; // ancestor
                    if (consumeOpt(state, 16392 /* Dot */)) {
                        if (state.currentToken === 16392 /* Dot */) {
                            throw Reporter.error(102 /* DoubleDot */, { state });
                        }
                        else if (state.currentToken === 1572864 /* EOF */) {
                            throw Reporter.error(105 /* ExpectedIdentifier */, { state });
                        }
                        continue;
                    }
                    else if (state.currentToken & 524288 /* AccessScopeTerminal */) {
                        const ancestor = access & 511 /* Ancestor */;
                        result = ancestor === 0 ? $this : ancestor === 1 ? $parent : new AccessThis(ancestor);
                        access = 512 /* This */;
                        break primary;
                    }
                    else {
                        throw Reporter.error(103 /* InvalidMemberExpression */, { state });
                    }
                } while (state.currentToken === 3077 /* ParentScope */);
            // falls through
            case 1024 /* Identifier */: // identifier
                if (bindingType & 512 /* IsIterator */) {
                    result = new BindingIdentifier(state.tokenValue);
                }
                else {
                    result = new AccessScope(state.tokenValue, access & 511 /* Ancestor */);
                    access = 1024 /* Scope */;
                }
                state.assignable = true;
                nextToken(state);
                break;
            case 3076 /* ThisScope */: // $this
                state.assignable = false;
                nextToken(state);
                result = $this;
                access = 512 /* This */;
                break;
            case 671750 /* OpenParen */: // parenthesized expression
                nextToken(state);
                result = parse(state, 0 /* Reset */, 62 /* Assign */, bindingType);
                consume(state, 1835018 /* CloseParen */);
                access = 0 /* Reset */;
                break;
            case 671756 /* OpenBracket */:
                result = parseArrayLiteralExpression(state, access, bindingType);
                access = 0 /* Reset */;
                break;
            case 131079 /* OpenBrace */:
                result = parseObjectLiteralExpression(state, bindingType);
                access = 0 /* Reset */;
                break;
            case 540713 /* TemplateTail */:
                result = new Template([state.tokenValue]);
                state.assignable = false;
                nextToken(state);
                access = 0 /* Reset */;
                break;
            case 540714 /* TemplateContinuation */:
                result = parseTemplate(state, access, bindingType, result, false);
                access = 0 /* Reset */;
                break;
            case 4096 /* StringLiteral */:
            case 8192 /* NumericLiteral */:
                result = new PrimitiveLiteral(state.tokenValue);
                state.assignable = false;
                nextToken(state);
                access = 0 /* Reset */;
                break;
            case 2050 /* NullKeyword */:
            case 2051 /* UndefinedKeyword */:
            case 2049 /* TrueKeyword */:
            case 2048 /* FalseKeyword */:
                result = TokenValues[state.currentToken & 63 /* Type */];
                state.assignable = false;
                nextToken(state);
                access = 0 /* Reset */;
                break;
            default:
                if (state.index >= state.length) {
                    throw Reporter.error(104 /* UnexpectedEndOfExpression */, { state });
                }
                else {
                    throw Reporter.error(101 /* UnconsumedToken */, { state });
                }
        }
        if (bindingType & 512 /* IsIterator */) {
            // tslint:disable-next-line:no-any
            return parseForOfStatement(state, result);
        }
        // tslint:disable-next-line:no-any
        if (449 /* LeftHandSide */ < minPrecedence)
            return result;
        /** parseMemberExpression (Token.Dot, Token.OpenBracket, Token.TemplateContinuation)
         * MemberExpression :
         *   1. PrimaryExpression
         *   2. MemberExpression [ AssignmentExpression ]
         *   3. MemberExpression . IdentifierName
         *   4. MemberExpression TemplateLiteral
         *
         * IsValidAssignmentTarget
         *   1,4 = false
         *   2,3 = true
         *
         *
         * parseCallExpression (Token.OpenParen)
         * CallExpression :
         *   1. MemberExpression Arguments
         *   2. CallExpression Arguments
         *   3. CallExpression [ AssignmentExpression ]
         *   4. CallExpression . IdentifierName
         *   5. CallExpression TemplateLiteral
         *
         * IsValidAssignmentTarget
         *   1,2,5 = false
         *   3,4 = true
         */
        let name = state.tokenValue;
        while ((state.currentToken & 16384 /* LeftHandSide */) > 0) {
            switch (state.currentToken) {
                case 16392 /* Dot */:
                    state.assignable = true;
                    nextToken(state);
                    if ((state.currentToken & 3072 /* IdentifierName */) === 0) {
                        throw Reporter.error(105 /* ExpectedIdentifier */, { state });
                    }
                    name = state.tokenValue;
                    nextToken(state);
                    // Change $This to $Scope, change $Scope to $Member, keep $Member as-is, change $Keyed to $Member, disregard other flags
                    access = ((access & (512 /* This */ | 1024 /* Scope */)) << 1) | (access & 2048 /* Member */) | ((access & 4096 /* Keyed */) >> 1);
                    if (state.currentToken === 671750 /* OpenParen */) {
                        if (access === 0 /* Reset */) { // if the left hand side is a literal, make sure we parse a CallMember
                            access = 2048 /* Member */;
                        }
                        continue;
                    }
                    if (access & 1024 /* Scope */) {
                        result = new AccessScope(name, result.ancestor);
                    }
                    else { // if it's not $Scope, it's $Member
                        result = new AccessMember(result, name);
                    }
                    continue;
                case 671756 /* OpenBracket */:
                    state.assignable = true;
                    nextToken(state);
                    access = 4096 /* Keyed */;
                    result = new AccessKeyed(result, parse(state, 0 /* Reset */, 62 /* Assign */, bindingType));
                    consume(state, 1835021 /* CloseBracket */);
                    break;
                case 671750 /* OpenParen */:
                    state.assignable = false;
                    nextToken(state);
                    const args = new Array();
                    while (state.currentToken !== 1835018 /* CloseParen */) {
                        args.push(parse(state, 0 /* Reset */, 62 /* Assign */, bindingType));
                        if (!consumeOpt(state, 1572875 /* Comma */)) {
                            break;
                        }
                    }
                    consume(state, 1835018 /* CloseParen */);
                    if (access & 1024 /* Scope */) {
                        result = new CallScope(name, args, result.ancestor);
                    }
                    else if (access & 2048 /* Member */) {
                        result = new CallMember(result, name, args);
                    }
                    else {
                        result = new CallFunction(result, args);
                    }
                    access = 0;
                    break;
                case 540713 /* TemplateTail */:
                    state.assignable = false;
                    const strings = [state.tokenValue];
                    result = new TaggedTemplate(strings, strings, result);
                    nextToken(state);
                    break;
                case 540714 /* TemplateContinuation */:
                    result = parseTemplate(state, access, bindingType, result, true);
                default:
            }
        }
    }
    // tslint:disable-next-line:no-any
    if (448 /* Binary */ < minPrecedence)
        return result;
    /** parseBinaryExpression
     * https://tc39.github.io/ecma262/#sec-multiplicative-operators
     *
     * MultiplicativeExpression : (local precedence 6)
     *   UnaryExpression
     *   MultiplicativeExpression * / % UnaryExpression
     *
     * AdditiveExpression : (local precedence 5)
     *   MultiplicativeExpression
     *   AdditiveExpression + - MultiplicativeExpression
     *
     * RelationalExpression : (local precedence 4)
     *   AdditiveExpression
     *   RelationalExpression < > <= >= instanceof in AdditiveExpression
     *
     * EqualityExpression : (local precedence 3)
     *   RelationalExpression
     *   EqualityExpression == != === !== RelationalExpression
     *
     * LogicalANDExpression : (local precedence 2)
     *   EqualityExpression
     *   LogicalANDExpression && EqualityExpression
     *
     * LogicalORExpression : (local precedence 1)
     *   LogicalANDExpression
     *   LogicalORExpression || LogicalANDExpression
     */
    while ((state.currentToken & 65536 /* BinaryOp */) > 0) {
        const opToken = state.currentToken;
        if ((opToken & 448 /* Precedence */) <= minPrecedence) {
            break;
        }
        nextToken(state);
        result = new Binary(TokenValues[opToken & 63 /* Type */], result, parse(state, access, opToken & 448 /* Precedence */, bindingType));
        state.assignable = false;
    }
    // tslint:disable-next-line:no-any
    if (63 /* Conditional */ < minPrecedence)
        return result;
    /**
     * parseConditionalExpression
     * https://tc39.github.io/ecma262/#prod-ConditionalExpression
     *
     * ConditionalExpression :
     *   1. BinaryExpression
     *   2. BinaryExpression ? AssignmentExpression : AssignmentExpression
     *
     * IsValidAssignmentTarget
     *   1,2 = false
     */
    if (consumeOpt(state, 1572879 /* Question */)) {
        const yes = parse(state, access, 62 /* Assign */, bindingType);
        consume(state, 1572878 /* Colon */);
        result = new Conditional(result, yes, parse(state, access, 62 /* Assign */, bindingType));
        state.assignable = false;
    }
    // tslint:disable-next-line:no-any
    if (62 /* Assign */ < minPrecedence)
        return result;
    /** parseAssignmentExpression
     * https://tc39.github.io/ecma262/#prod-AssignmentExpression
     * Note: AssignmentExpression here is equivalent to ES Expression because we don't parse the comma operator
     *
     * AssignmentExpression :
     *   1. ConditionalExpression
     *   2. LeftHandSideExpression = AssignmentExpression
     *
     * IsValidAssignmentTarget
     *   1,2 = false
     */
    if (consumeOpt(state, 1048615 /* Equals */)) {
        if (!state.assignable) {
            throw Reporter.error(150 /* NotAssignable */, { state });
        }
        result = new Assign(result, parse(state, access, 62 /* Assign */, bindingType));
    }
    // tslint:disable-next-line:no-any
    if (61 /* Variadic */ < minPrecedence)
        return result;
    /** parseValueConverter
     */
    while (consumeOpt(state, 1572883 /* Bar */)) {
        if (state.currentToken === 1572864 /* EOF */) {
            throw Reporter.error(112);
        }
        const name = state.tokenValue;
        nextToken(state);
        const args = new Array();
        while (consumeOpt(state, 1572878 /* Colon */)) {
            args.push(parse(state, access, 62 /* Assign */, bindingType));
        }
        result = new ValueConverter(result, name, args);
    }
    /** parseBindingBehavior
     */
    while (consumeOpt(state, 1572880 /* Ampersand */)) {
        if (state.currentToken === 1572864 /* EOF */) {
            throw Reporter.error(113);
        }
        const name = state.tokenValue;
        nextToken(state);
        const args = new Array();
        while (consumeOpt(state, 1572878 /* Colon */)) {
            args.push(parse(state, access, 62 /* Assign */, bindingType));
        }
        result = new BindingBehavior(result, name, args);
    }
    if (state.currentToken !== 1572864 /* EOF */) {
        if (bindingType & 2048 /* Interpolation */) {
            // tslint:disable-next-line:no-any
            return result;
        }
        if (state.tokenRaw === 'of') {
            throw Reporter.error(151 /* UnexpectedForOf */, { state });
        }
        throw Reporter.error(101 /* UnconsumedToken */, { state });
    }
    // tslint:disable-next-line:no-any
    return result;
}
/**
 * parseArrayLiteralExpression
 * https://tc39.github.io/ecma262/#prod-ArrayLiteral
 *
 * ArrayLiteral :
 *   [ Elision(opt) ]
 *   [ ElementList ]
 *   [ ElementList, Elision(opt) ]
 *
 * ElementList :
 *   Elision(opt) AssignmentExpression
 *   ElementList, Elision(opt) AssignmentExpression
 *
 * Elision :
 *  ,
 *  Elision ,
 */
function parseArrayLiteralExpression(state, access, bindingType) {
    nextToken(state);
    const elements = new Array();
    while (state.currentToken !== 1835021 /* CloseBracket */) {
        if (consumeOpt(state, 1572875 /* Comma */)) {
            elements.push($undefined);
            if (state.currentToken === 1835021 /* CloseBracket */) {
                elements.push($undefined);
                break;
            }
        }
        else {
            elements.push(parse(state, access, 62 /* Assign */, bindingType & ~512 /* IsIterator */));
            if (consumeOpt(state, 1572875 /* Comma */)) {
                if (state.currentToken === 1835021 /* CloseBracket */) {
                    elements.push($undefined);
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    consume(state, 1835021 /* CloseBracket */);
    if (bindingType & 512 /* IsIterator */) {
        return new ArrayBindingPattern(elements);
    }
    else {
        state.assignable = false;
        return new ArrayLiteral(elements);
    }
}
function parseForOfStatement(state, result) {
    if ((result.$kind & 65536 /* IsForDeclaration */) === 0) {
        throw Reporter.error(106 /* InvalidForDeclaration */, { state });
    }
    if (state.currentToken !== 1051179 /* OfKeyword */) {
        throw Reporter.error(106 /* InvalidForDeclaration */, { state });
    }
    nextToken(state);
    const declaration = result;
    const statement = parse(state, 0 /* Reset */, 61 /* Variadic */, 0 /* None */);
    return new ForOfStatement(declaration, statement);
}
/**
 * parseObjectLiteralExpression
 * https://tc39.github.io/ecma262/#prod-Literal
 *
 * ObjectLiteral :
 *   { }
 *   { PropertyDefinitionList }
 *
 * PropertyDefinitionList :
 *   PropertyDefinition
 *   PropertyDefinitionList, PropertyDefinition
 *
 * PropertyDefinition :
 *   IdentifierName
 *   PropertyName : AssignmentExpression
 *
 * PropertyName :
 *   IdentifierName
 *   StringLiteral
 *   NumericLiteral
 */
function parseObjectLiteralExpression(state, bindingType) {
    const keys = new Array();
    const values = new Array();
    nextToken(state);
    while (state.currentToken !== 1835017 /* CloseBrace */) {
        keys.push(state.tokenValue);
        // Literal = mandatory colon
        if (state.currentToken & 12288 /* StringOrNumericLiteral */) {
            nextToken(state);
            consume(state, 1572878 /* Colon */);
            values.push(parse(state, 0 /* Reset */, 62 /* Assign */, bindingType & ~512 /* IsIterator */));
        }
        else if (state.currentToken & 3072 /* IdentifierName */) {
            // IdentifierName = optional colon
            const { currentChar, currentToken, index } = state;
            nextToken(state);
            if (consumeOpt(state, 1572878 /* Colon */)) {
                values.push(parse(state, 0 /* Reset */, 62 /* Assign */, bindingType & ~512 /* IsIterator */));
            }
            else {
                // Shorthand
                state.currentChar = currentChar;
                state.currentToken = currentToken;
                state.index = index;
                values.push(parse(state, 0 /* Reset */, 450 /* Primary */, bindingType & ~512 /* IsIterator */));
            }
        }
        else {
            throw Reporter.error(107 /* InvalidObjectLiteralPropertyDefinition */, { state });
        }
        if (state.currentToken !== 1835017 /* CloseBrace */) {
            consume(state, 1572875 /* Comma */);
        }
    }
    consume(state, 1835017 /* CloseBrace */);
    if (bindingType & 512 /* IsIterator */) {
        return new ObjectBindingPattern(keys, values);
    }
    else {
        state.assignable = false;
        return new ObjectLiteral(keys, values);
    }
}
function parseInterpolation(state) {
    const parts = [];
    const expressions = [];
    const length = state.length;
    let result = '';
    while (state.index < length) {
        switch (state.currentChar) {
            case 36 /* Dollar */:
                if (state.input.charCodeAt(state.index + 1) === 123 /* OpenBrace */) {
                    parts.push(result);
                    result = '';
                    state.index += 2;
                    state.currentChar = state.input.charCodeAt(state.index);
                    nextToken(state);
                    const expression = parse(state, 0 /* Reset */, 61 /* Variadic */, 2048 /* Interpolation */);
                    expressions.push(expression);
                    continue;
                }
                else {
                    result += '$';
                }
                break;
            case 92 /* Backslash */:
                result += String.fromCharCode(unescapeCode(nextChar(state)));
                break;
            default:
                result += String.fromCharCode(state.currentChar);
        }
        nextChar(state);
    }
    if (expressions.length) {
        parts.push(result);
        return new Interpolation(parts, expressions);
    }
    return null;
}
/**
 * parseTemplateLiteralExpression
 * https://tc39.github.io/ecma262/#prod-Literal
 *
 * Template :
 *   NoSubstitutionTemplate
 *   TemplateHead
 *
 * NoSubstitutionTemplate :
 *   ` TemplateCharacters(opt) `
 *
 * TemplateHead :
 *   ` TemplateCharacters(opt) ${
 *
 * TemplateSubstitutionTail :
 *   TemplateMiddle
 *   TemplateTail
 *
 * TemplateMiddle :
 *   } TemplateCharacters(opt) ${
 *
 * TemplateTail :
 *   } TemplateCharacters(opt) `
 *
 * TemplateCharacters :
 *   TemplateCharacter TemplateCharacters(opt)
 *
 * TemplateCharacter :
 *   $ [lookahead ≠ {]
 *   \ EscapeSequence
 *   SourceCharacter (but not one of ` or \ or $)
 */
function parseTemplate(state, access, bindingType, result, tagged) {
    const cooked = [state.tokenValue];
    //const raw = [state.tokenRaw];
    consume(state, 540714 /* TemplateContinuation */);
    const expressions = [parse(state, access, 62 /* Assign */, bindingType)];
    while ((state.currentToken = scanTemplateTail(state)) !== 540713 /* TemplateTail */) {
        cooked.push(state.tokenValue);
        // if (tagged) {
        //   raw.push(state.tokenRaw);
        // }
        consume(state, 540714 /* TemplateContinuation */);
        expressions.push(parse(state, access, 62 /* Assign */, bindingType));
    }
    cooked.push(state.tokenValue);
    state.assignable = false;
    if (tagged) {
        //raw.push(state.tokenRaw);
        nextToken(state);
        return new TaggedTemplate(cooked, cooked, result, expressions);
    }
    else {
        nextToken(state);
        return new Template(cooked, expressions);
    }
}
function nextToken(state) {
    while (state.index < state.length) {
        state.startIndex = state.index;
        if ((state.currentToken = CharScanners[state.currentChar](state)) !== null) { // a null token means the character must be skipped
            return;
        }
    }
    state.currentToken = 1572864 /* EOF */;
}
function nextChar(state) {
    return state.currentChar = state.input.charCodeAt(++state.index);
}
function scanIdentifier(state) {
    // run to the next non-idPart
    while (IdParts[nextChar(state)])
        ;
    return KeywordLookup[state.tokenValue = state.tokenRaw] || 1024 /* Identifier */;
}
function scanNumber(state, isFloat) {
    if (isFloat) {
        state.tokenValue = 0;
    }
    else {
        state.tokenValue = state.currentChar - 48 /* Zero */;
        while (nextChar(state) <= 57 /* Nine */ && state.currentChar >= 48 /* Zero */) {
            state.tokenValue = state.tokenValue * 10 + state.currentChar - 48 /* Zero */;
        }
    }
    if (isFloat || state.currentChar === 46 /* Dot */) {
        // isFloat (coming from the period scanner) means the period was already skipped
        if (!isFloat) {
            isFloat = true;
            nextChar(state);
            if (state.index >= state.length) {
                // a trailing period is valid javascript, so return here to prevent creating a NaN down below
                return 8192 /* NumericLiteral */;
            }
        }
        // note: this essentially make member expressions on numeric literals valid;
        // this makes sense to allow since they're always stored in variables, and they can legally be evaluated
        // this would be consistent with declaring a literal as a normal variable and performing an operation on that
        const current = state.currentChar;
        if (current > 57 /* Nine */ || current < 48 /* Zero */) {
            state.currentChar = state.input.charCodeAt(--state.index);
            return 8192 /* NumericLiteral */;
        }
        const start = state.index;
        let value = state.currentChar - 48 /* Zero */;
        while (nextChar(state) <= 57 /* Nine */ && state.currentChar >= 48 /* Zero */) {
            value = value * 10 + state.currentChar - 48 /* Zero */;
        }
        state.tokenValue = state.tokenValue + value / 10 ** (state.index - start);
    }
    // in the rare case that we go over this number, re-parse the number with the (slower) native number parsing,
    // to ensure consistency with the spec
    if (state.tokenValue > Number.MAX_SAFE_INTEGER) {
        if (isFloat) {
            state.tokenValue = parseFloat(state.tokenRaw);
        }
        else {
            state.tokenValue = parseInt(state.tokenRaw, 10);
        }
    }
    return 8192 /* NumericLiteral */;
}
function scanString(state) {
    const quote = state.currentChar;
    nextChar(state); // Skip initial quote.
    let unescaped = 0;
    const buffer = new Array();
    let marker = state.index;
    while (state.currentChar !== quote) {
        if (state.currentChar === 92 /* Backslash */) {
            buffer.push(state.input.slice(marker, state.index));
            nextChar(state);
            unescaped = unescapeCode(state.currentChar);
            nextChar(state);
            buffer.push(String.fromCharCode(unescaped));
            marker = state.index;
        }
        else if (state.index >= state.length) {
            throw Reporter.error(108 /* UnterminatedQuote */, { state });
        }
        else {
            nextChar(state);
        }
    }
    const last = state.input.slice(marker, state.index);
    nextChar(state); // Skip terminating quote.
    // Compute the unescaped string value.
    buffer.push(last);
    const unescapedStr = buffer.join('');
    state.tokenValue = unescapedStr;
    return 4096 /* StringLiteral */;
}
function scanTemplate(state) {
    let tail = true;
    let result = '';
    while (nextChar(state) !== 96 /* Backtick */) {
        if (state.currentChar === 36 /* Dollar */) {
            if ((state.index + 1) < state.length && state.input.charCodeAt(state.index + 1) === 123 /* OpenBrace */) {
                state.index++;
                tail = false;
                break;
            }
            else {
                result += '$';
            }
        }
        else if (state.currentChar === 92 /* Backslash */) {
            result += String.fromCharCode(unescapeCode(nextChar(state)));
        }
        else {
            if (state.index >= state.length) {
                throw Reporter.error(109 /* UnterminatedTemplate */, { state });
            }
            result += String.fromCharCode(state.currentChar);
        }
    }
    nextChar(state);
    state.tokenValue = result;
    if (tail) {
        return 540713 /* TemplateTail */;
    }
    return 540714 /* TemplateContinuation */;
}
function scanTemplateTail(state) {
    if (state.index >= state.length) {
        throw Reporter.error(109 /* UnterminatedTemplate */, { state });
    }
    state.index--;
    return scanTemplate(state);
}
function consumeOpt(state, token) {
    // tslint:disable-next-line:possible-timing-attack
    if (state.currentToken === token) {
        nextToken(state);
        return true;
    }
    return false;
}
function consume(state, token) {
    // tslint:disable-next-line:possible-timing-attack
    if (state.currentToken === token) {
        nextToken(state);
    }
    else {
        throw Reporter.error(110 /* MissingExpectedToken */, { state, expected: token });
    }
}
/**
 * Array for mapping tokens to token values. The indices of the values
 * correspond to the token bits 0-38.
 * For this to work properly, the values in the array must be kept in
 * the same order as the token bits.
 * Usage: TokenValues[token & Token.Type]
 */
const TokenValues = [
    $false, $true, $null, $undefined, '$this', '$parent',
    '(', '{', '.', '}', ')', ',', '[', ']', ':', '?', '\'', '"',
    '&', '|', '||', '&&', '==', '!=', '===', '!==', '<', '>',
    '<=', '>=', 'in', 'instanceof', '+', '-', 'typeof', 'void', '*', '%', '/', '=', '!',
    540713 /* TemplateTail */, 540714 /* TemplateContinuation */,
    'of'
];
const KeywordLookup = Object.create(null);
KeywordLookup.true = 2049 /* TrueKeyword */;
KeywordLookup.null = 2050 /* NullKeyword */;
KeywordLookup.false = 2048 /* FalseKeyword */;
KeywordLookup.undefined = 2051 /* UndefinedKeyword */;
KeywordLookup.$this = 3076 /* ThisScope */;
KeywordLookup.$parent = 3077 /* ParentScope */;
KeywordLookup.in = 1640798 /* InKeyword */;
KeywordLookup.instanceof = 1640799 /* InstanceOfKeyword */;
KeywordLookup.typeof = 34850 /* TypeofKeyword */;
KeywordLookup.void = 34851 /* VoidKeyword */;
KeywordLookup.of = 1051179 /* OfKeyword */;
/**
 * Ranges of code points in pairs of 2 (eg 0x41-0x5B, 0x61-0x7B, ...) where the second value is not inclusive (5-7 means 5 and 6)
 * Single values are denoted by the second value being a 0
 *
 * Copied from output generated with "node build/generate-unicode.js"
 *
 * See also: https://en.wikibooks.org/wiki/Unicode/Character_reference/0000-0FFF
 */
const codes = {
    /* [$0-9A-Za_a-z] */
    AsciiIdPart: [0x24, 0, 0x30, 0x3A, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B],
    IdStart: /*IdentifierStart*/ [0x24, 0, 0x41, 0x5B, 0x5F, 0, 0x61, 0x7B, 0xAA, 0, 0xBA, 0, 0xC0, 0xD7, 0xD8, 0xF7, 0xF8, 0x2B9, 0x2E0, 0x2E5, 0x1D00, 0x1D26, 0x1D2C, 0x1D5D, 0x1D62, 0x1D66, 0x1D6B, 0x1D78, 0x1D79, 0x1DBF, 0x1E00, 0x1F00, 0x2071, 0, 0x207F, 0, 0x2090, 0x209D, 0x212A, 0x212C, 0x2132, 0, 0x214E, 0, 0x2160, 0x2189, 0x2C60, 0x2C80, 0xA722, 0xA788, 0xA78B, 0xA7AF, 0xA7B0, 0xA7B8, 0xA7F7, 0xA800, 0xAB30, 0xAB5B, 0xAB5C, 0xAB65, 0xFB00, 0xFB07, 0xFF21, 0xFF3B, 0xFF41, 0xFF5B],
    Digit: /*DecimalNumber*/ [0x30, 0x3A],
    Skip: /*Skippable*/ [0, 0x21, 0x7F, 0xA1]
};
/**
 * Decompress the ranges into an array of numbers so that the char code
 * can be used as an index to the lookup
 */
function decompress(lookup, $set, compressed, value) {
    const rangeCount = compressed.length;
    for (let i = 0; i < rangeCount; i += 2) {
        const start = compressed[i];
        let end = compressed[i + 1];
        end = end > 0 ? end : start + 1;
        if (lookup) {
            lookup.fill(value, start, end);
        }
        if ($set) {
            for (let ch = start; ch < end; ch++) {
                $set.add(ch);
            }
        }
    }
}
// CharFuncLookup functions
function returnToken(token) {
    return s => {
        nextChar(s);
        return token;
    };
}
const unexpectedCharacter = s => {
    throw Reporter.error(111 /* UnexpectedCharacter */, { state: s });
};
unexpectedCharacter.notMapped = true;
// ASCII IdentifierPart lookup
const AsciiIdParts = new Set();
decompress(null, AsciiIdParts, codes.AsciiIdPart, true);
// IdentifierPart lookup
const IdParts = new Uint8Array(0xFFFF);
// tslint:disable-next-line:no-any
decompress(IdParts, null, codes.IdStart, 1);
// tslint:disable-next-line:no-any
decompress(IdParts, null, codes.Digit, 1);
// Character scanning function lookup
const CharScanners = new Array(0xFFFF);
CharScanners.fill(unexpectedCharacter, 0, 0xFFFF);
decompress(CharScanners, null, codes.Skip, s => {
    nextChar(s);
    return null;
});
decompress(CharScanners, null, codes.IdStart, scanIdentifier);
decompress(CharScanners, null, codes.Digit, s => scanNumber(s, false));
CharScanners[34 /* DoubleQuote */] =
    CharScanners[39 /* SingleQuote */] = s => {
        return scanString(s);
    };
CharScanners[96 /* Backtick */] = s => {
    return scanTemplate(s);
};
// !, !=, !==
CharScanners[33 /* Exclamation */] = s => {
    if (nextChar(s) !== 61 /* Equals */) {
        return 32808 /* Exclamation */;
    }
    if (nextChar(s) !== 61 /* Equals */) {
        return 1638679 /* ExclamationEquals */;
    }
    nextChar(s);
    return 1638681 /* ExclamationEqualsEquals */;
};
// =, ==, ===
CharScanners[61 /* Equals */] = s => {
    if (nextChar(s) !== 61 /* Equals */) {
        return 1048615 /* Equals */;
    }
    if (nextChar(s) !== 61 /* Equals */) {
        return 1638678 /* EqualsEquals */;
    }
    nextChar(s);
    return 1638680 /* EqualsEqualsEquals */;
};
// &, &&
CharScanners[38 /* Ampersand */] = s => {
    if (nextChar(s) !== 38 /* Ampersand */) {
        return 1572880 /* Ampersand */;
    }
    nextChar(s);
    return 1638613 /* AmpersandAmpersand */;
};
// |, ||
CharScanners[124 /* Bar */] = s => {
    if (nextChar(s) !== 124 /* Bar */) {
        return 1572883 /* Bar */;
    }
    nextChar(s);
    return 1638548 /* BarBar */;
};
// .
CharScanners[46 /* Dot */] = s => {
    if (nextChar(s) <= 57 /* Nine */ && s.currentChar >= 48 /* Zero */) {
        return scanNumber(s, true);
    }
    return 16392 /* Dot */;
};
// <, <=
CharScanners[60 /* LessThan */] = s => {
    if (nextChar(s) !== 61 /* Equals */) {
        return 1638746 /* LessThan */;
    }
    nextChar(s);
    return 1638748 /* LessThanEquals */;
};
// >, >=
CharScanners[62 /* GreaterThan */] = s => {
    if (nextChar(s) !== 61 /* Equals */) {
        return 1638747 /* GreaterThan */;
    }
    nextChar(s);
    return 1638749 /* GreaterThanEquals */;
};
CharScanners[37 /* Percent */] = returnToken(1638885 /* Percent */);
CharScanners[40 /* OpenParen */] = returnToken(671750 /* OpenParen */);
CharScanners[41 /* CloseParen */] = returnToken(1835018 /* CloseParen */);
CharScanners[42 /* Asterisk */] = returnToken(1638884 /* Asterisk */);
CharScanners[43 /* Plus */] = returnToken(623008 /* Plus */);
CharScanners[44 /* Comma */] = returnToken(1572875 /* Comma */);
CharScanners[45 /* Minus */] = returnToken(623009 /* Minus */);
CharScanners[47 /* Slash */] = returnToken(1638886 /* Slash */);
CharScanners[58 /* Colon */] = returnToken(1572878 /* Colon */);
CharScanners[63 /* Question */] = returnToken(1572879 /* Question */);
CharScanners[91 /* OpenBracket */] = returnToken(671756 /* OpenBracket */);
CharScanners[93 /* CloseBracket */] = returnToken(1835021 /* CloseBracket */);
CharScanners[123 /* OpenBrace */] = returnToken(131079 /* OpenBrace */);
CharScanners[125 /* CloseBrace */] = returnToken(1835017 /* CloseBrace */);

const domParser = DOM.createElement('div');
const marker = DOM.createElement('au-marker');
marker.classList.add('au');
const createMarker = marker.cloneNode.bind(marker, false);
class ElementSyntax {
    constructor(node, name, $content, $children, $attributes) {
        this.node = node;
        this.name = name;
        this.$content = $content;
        this.$children = $children;
        this.$attributes = $attributes;
    }
    static createMarker() {
        return new ElementSyntax(createMarker(), 'au-marker', null, PLATFORM.emptyArray, PLATFORM.emptyArray);
    }
}
const IElementParser = DI.createInterface()
    .withDefault(x => x.singleton(ElementParser));
/*@internal*/
let ElementParser = class ElementParser {
    constructor(attrParser) {
        this.attrParser = attrParser;
    }
    parse(markupOrNode) {
        let node;
        if (typeof markupOrNode === 'string') {
            domParser.innerHTML = markupOrNode;
            node = domParser.firstElementChild;
            domParser.removeChild(node);
        }
        else {
            node = markupOrNode;
        }
        let children;
        let content;
        if (node.nodeName === 'TEMPLATE') {
            content = this.parse(node.content);
            children = PLATFORM.emptyArray;
        }
        else {
            content = null;
            const nodeChildNodes = node.childNodes;
            const nodeLen = nodeChildNodes.length;
            if (nodeLen > 0) {
                children = Array(nodeLen);
                for (let i = 0, ii = nodeLen; i < ii; ++i) {
                    children[i] = this.parse(nodeChildNodes[i]);
                }
            }
            else {
                children = PLATFORM.emptyArray;
            }
        }
        let attributes;
        const nodeAttributes = node.attributes;
        const attrLen = nodeAttributes && nodeAttributes.length || 0;
        if (attrLen > 0) {
            attributes = Array(attrLen);
            for (let i = 0, ii = attrLen; i < ii; ++i) {
                const attr = nodeAttributes[i];
                attributes[i] = this.attrParser.parse(attr.name, attr.value);
            }
        }
        else {
            attributes = PLATFORM.emptyArray;
        }
        return new ElementSyntax(node, node.nodeName, content, children, attributes);
    }
};
ElementParser = __decorate([
    inject(IAttributeParser)
], ElementParser);

class SemanticModel {
    constructor(definition, resources, attrParser, elParser, exprParser) {
        this.resources = resources;
        this.attrParser = attrParser;
        this.elParser = elParser;
        this.exprParser = exprParser;
        this.isSemanticModel = true;
        this.attrDefCache = {};
        this.elDefCache = {};
        this.commandCache = {};
        const syntax = this.elParser.parse(definition.template);
        definition.template = syntax.node;
        this.root = new ElementSymbol(
        /*   semanticModel*/ this, 
        /*isDefinitionRoot*/ true, 
        /* $definitionRoot*/ null, 
        /*         $parent*/ null, 
        /*          syntax*/ syntax, 
        /*      definition*/ definition);
    }
    static create(definition, resources, attrParser, elParser, exprParser) {
        if ('get' in attrParser) {
            const locator = attrParser;
            attrParser = locator.get(IAttributeParser);
            elParser = locator.get(IElementParser);
            exprParser = locator.get(IExpressionParser);
        }
        return new SemanticModel(definition, resources, attrParser, elParser, exprParser);
    }
    getAttributeDefinition(name) {
        const existing = this.attrDefCache[name];
        if (existing !== undefined) {
            return existing;
        }
        const definition = this.resources.find(CustomAttributeResource, name) || null;
        return this.attrDefCache[name] = definition;
    }
    getElementDefinition(name) {
        const existing = this.elDefCache[name];
        if (existing !== undefined) {
            return existing;
        }
        const definition = this.resources.find(CustomElementResource, name) || null;
        return this.elDefCache[name] = definition;
    }
    getBindingCommand(name) {
        const existing = this.commandCache[name];
        if (existing !== undefined) {
            return existing;
        }
        const instance = this.resources.create(BindingCommandResource, name) || null;
        return this.commandCache[name] = instance;
    }
    getAttributeSymbol(syntax, element) {
        const definition = this.getAttributeDefinition(PLATFORM.camelCase(syntax.target));
        const command = this.getBindingCommand(syntax.command);
        return new AttributeSymbol(this, element, syntax, definition, command);
    }
    getMultiAttrBindingSymbol(syntax, parent) {
        const command = this.getBindingCommand(syntax.command);
        return new MultiAttributeBindingSymbol(this, parent, syntax, command);
    }
    getElementSymbol(syntax, parent) {
        const node = syntax.node;
        let definition;
        if (node.nodeType === 1 /* Element */) {
            const resourceKey = (node.getAttribute('as-element') || node.nodeName).toLowerCase();
            definition = this.getElementDefinition(resourceKey);
        }
        return new ElementSymbol(
        /*   semanticModel*/ this, 
        /*isDefinitionRoot*/ false, 
        /* $definitionRoot*/ parent.$root, 
        /*         $parent*/ parent, 
        /*          syntax*/ syntax, 
        /*      definition*/ definition);
    }
    getTemplateElementSymbol(syntax, parent, definition, definitionRoot) {
        return new ElementSymbol(
        /*   semanticModel*/ this, 
        /*isDefinitionRoot*/ true, 
        /* $definitionRoot*/ definitionRoot, 
        /*         $parent*/ parent, 
        /*          syntax*/ syntax, 
        /*      definition*/ definition);
    }
}
class MultiAttributeBindingSymbol {
    constructor(semanticModel, $parent, syntax, command) {
        this.semanticModel = semanticModel;
        this.$parent = $parent;
        this.syntax = syntax;
        this.command = command;
        this.isMultiAttrBinding = true;
        this.res = null;
        this.bindable = null;
        this.isTemplateController = false;
        this.isCustomAttribute = true;
        this.isAttributeBindable = false;
        this.isDefaultAttributeBindable = false;
        this.onCustomElement = false;
        this.isElementBindable = false;
        this.$element = null;
        this.target = syntax.target;
        this.rawName = syntax.rawName;
        this.rawValue = syntax.rawValue;
        this.rawCommand = syntax.command;
        this.hasBindingCommand = !!command;
        this.isHandledByBindingCommand = this.hasBindingCommand && command.handles(this);
        const bindables = $parent.definition.bindables;
        for (const prop in bindables) {
            const b = bindables[prop];
            if (b.property === syntax.target) {
                this.to = b.property;
                this.mode = (b.mode && b.mode !== BindingMode.default) ? b.mode : BindingMode.toView;
                this.bindable = b;
                this.isAttributeBindable = true;
                break;
            }
        }
        if (!this.isAttributeBindable) {
            this.to = syntax.target;
            this.mode = $parent.definition.defaultBindingMode || BindingMode.toView;
        }
    }
}
class AttributeSymbol {
    constructor(semanticModel, $element, syntax, definition, command) {
        this.semanticModel = semanticModel;
        this.$element = $element;
        this.syntax = syntax;
        this.definition = definition;
        this.command = command;
        this.isMultiAttrBinding = false;
        this.res = null;
        this.bindable = null;
        this.isAttributeBindable = false;
        this.isDefaultAttributeBindable = false;
        this.isElementBindable = false;
        this.isBindable = false;
        this.isTemplateController = false;
        this.target = syntax.target;
        this.rawName = syntax.rawName;
        this.rawValue = syntax.rawValue;
        this.rawCommand = syntax.command;
        this.isCustomAttribute = !!definition;
        this.hasBindingCommand = !!command;
        this.isHandledByBindingCommand = this.hasBindingCommand && command.handles(this);
        this.onCustomElement = $element.isCustomElement;
        this._isProcessed = this.rawName === 'as-element'; // as-element is processed by the semantic model and shouldn't be processed by the template compiler
        if (this.isCustomAttribute) {
            this.isTemplateController = !!definition.isTemplateController;
            this.res = definition.name;
            const value = syntax.rawValue;
            let lastIndex = 0;
            let multiAttrBindings;
            for (let i = 0, ii = value.length; i < ii; ++i) {
                if (value.charCodeAt(i) === 59 /* Semicolon */) {
                    if (!this.isMultiAttrBinding) {
                        multiAttrBindings = [];
                        this.isMultiAttrBinding = true;
                    }
                    const innerAttr = value.slice(lastIndex, i).trim();
                    lastIndex = i + 1;
                    if (innerAttr.length === 0) {
                        continue;
                    }
                    for (let j = 0, jj = innerAttr.length; j < jj; ++j) {
                        if (innerAttr.charCodeAt(j) === 58 /* Colon */) {
                            const innerAttrName = innerAttr.slice(0, j).trim();
                            const innerAttrValue = innerAttr.slice(j + 1).trim();
                            const innerAttrSyntax = this.semanticModel.attrParser.parse(innerAttrName, innerAttrValue);
                            multiAttrBindings.push(this.semanticModel.getMultiAttrBindingSymbol(innerAttrSyntax, this));
                        }
                    }
                }
            }
            this.$multiAttrBindings = this.isMultiAttrBinding ? multiAttrBindings : PLATFORM.emptyArray;
            const bindables = definition.bindables;
            if (!this.isMultiAttrBinding) {
                for (const prop in bindables) {
                    const b = bindables[prop];
                    this.to = b.property;
                    this.mode = (b.mode && b.mode !== BindingMode.default) ? b.mode : (definition.defaultBindingMode || BindingMode.toView);
                    this.bindable = b;
                    this.isBindable = this.isAttributeBindable = true;
                    break;
                }
                if (!this.isAttributeBindable) {
                    this.to = 'value';
                    this.mode = definition.defaultBindingMode || BindingMode.toView;
                    this.isBindable = this.isAttributeBindable = this.isDefaultAttributeBindable = true;
                }
            }
        }
        else if ($element.isCustomElement) {
            const bindables = $element.definition.bindables;
            for (const prop in bindables) {
                const b = bindables[prop];
                if (b.attribute === syntax.target) {
                    this.to = b.property;
                    this.mode = (b.mode && b.mode !== BindingMode.default) ? b.mode : BindingMode.toView;
                    this.bindable = b;
                    this.isBindable = this.isElementBindable = true;
                    break;
                }
            }
            if (!this.isElementBindable) {
                this.to = syntax.target;
                this.mode = BindingMode.toView;
            }
        }
        else {
            this.to = syntax.target;
            this.mode = BindingMode.toView;
        }
    }
    get isProcessed() {
        return this._isProcessed;
    }
    markAsProcessed() {
        this._isProcessed = true;
        if (this.isTemplateController) {
            this.$element.node.removeAttribute(this.rawName);
        }
    }
}
class ElementSymbol {
    constructor(semanticModel, isRoot, $root, $parent, syntax, definition) {
        this.semanticModel = semanticModel;
        this.isRoot = isRoot;
        this.$root = $root;
        this.$parent = $parent;
        this.definition = definition;
        this._$content = null;
        this._isMarker = false;
        this._isTemplate = false;
        this._isSlot = false;
        this._isLet = false;
        this._isLifted = false;
        this.$root = isRoot ? this : $root;
        this._node = syntax.node;
        this._syntax = syntax;
        this._name = this.node.nodeName;
        switch (this.name) {
            case 'TEMPLATE':
                this._isTemplate = true;
                this._$content = this.semanticModel.getElementSymbol(syntax.$content, this);
                break;
            case 'SLOT':
                this._isSlot = true;
                break;
            case 'LET':
                this._isLet = true;
        }
        this._isCustomElement = !isRoot && !!definition;
        const attributes = syntax.$attributes;
        const attrLen = attributes.length;
        if (attrLen > 0) {
            const attrSymbols = Array(attrLen);
            for (let i = 0, ii = attrLen; i < ii; ++i) {
                attrSymbols[i] = this.semanticModel.getAttributeSymbol(attributes[i], this);
            }
            this.$attributes = attrSymbols;
        }
        else {
            this.$attributes = PLATFORM.emptyArray;
        }
        const children = syntax.$children;
        const childLen = children.length;
        if (childLen > 0) {
            const childSymbols = Array(childLen);
            for (let i = 0, ii = childLen; i < ii; ++i) {
                childSymbols[i] = this.semanticModel.getElementSymbol(children[i], this);
            }
            this.$children = childSymbols;
        }
        else {
            this.$children = PLATFORM.emptyArray;
        }
    }
    get $content() {
        return this._$content;
    }
    get isMarker() {
        return this._isMarker;
    }
    get isTemplate() {
        return this._isTemplate;
    }
    get isSlot() {
        return this._isSlot;
    }
    get isLet() {
        return this._isLet;
    }
    get node() {
        return this._node;
    }
    get syntax() {
        return this._syntax;
    }
    get name() {
        return this._name;
    }
    get isCustomElement() {
        return this._isCustomElement;
    }
    get nextSibling() {
        if (!this.$parent) {
            return null;
        }
        const siblings = this.$parent.$children;
        for (let i = 0, ii = siblings.length; i < ii; ++i) {
            if (siblings[i] === this) {
                return siblings[i + 1] || null;
            }
        }
        return null;
    }
    get firstChild() {
        return this.$children[0] || null;
    }
    get componentRoot() {
        return this.semanticModel.root;
    }
    get isLifted() {
        return this._isLifted;
    }
    makeTarget() {
        this.node.classList.add('au');
    }
    replaceTextNodeWithMarker() {
        const marker = ElementSyntax.createMarker();
        const node = this.node;
        node.parentNode.insertBefore(marker.node, node);
        node.textContent = ' ';
        while (node.nextSibling && node.nextSibling.nodeType === 3 /* Text */) {
            node.parentNode.removeChild(node.nextSibling);
        }
        this.setToMarker(marker);
    }
    replaceNodeWithMarker() {
        const marker = ElementSyntax.createMarker();
        const node = this.node;
        if (node.parentNode) {
            node.parentNode.replaceChild(marker.node, node);
        }
        else if (this.isTemplate) {
            node.content.appendChild(marker.node);
        }
        this.setToMarker(marker);
    }
    lift(instruction) {
        const template = instruction.def.template = DOM.createElement('template');
        const node = this.node;
        if (this.isTemplate) {
            // copy remaining attributes over to the newly created template
            const attributes = node.attributes;
            while (attributes.length) {
                const attr = attributes[0];
                template.setAttribute(attr.name, attr.value);
                node.removeAttribute(attr.name);
            }
            template.content.appendChild(node.content);
            this.replaceNodeWithMarker();
        }
        else {
            this.replaceNodeWithMarker();
            template.content.appendChild(node);
        }
        this.addInstructions([instruction]);
        this._isLifted = true;
        return this.semanticModel.getTemplateElementSymbol(this.semanticModel.elParser.parse(template), this, instruction.def, null);
    }
    addInstructions(instructions) {
        const def = this.$root.definition;
        if (def.instructions === PLATFORM.emptyArray) {
            def.instructions = [];
        }
        def.instructions.push(instructions);
    }
    setToMarker(marker) {
        this._$content = null;
        this._isCustomElement = this._isLet = this._isSlot = this._isTemplate = false;
        this._isMarker = true;
        this._name = 'AU-MARKER';
        this._node = marker.node;
        this._syntax = marker;
    }
}

let TemplateCompiler = class TemplateCompiler {
    constructor(exprParser, elParser, attrParser) {
        this.exprParser = exprParser;
        this.elParser = elParser;
        this.attrParser = attrParser;
    }
    get name() {
        return 'default';
    }
    compile(definition, resources, flags) {
        const model = SemanticModel.create(definition, resources, this.attrParser, this.elParser, this.exprParser);
        const root = model.root;
        let $el = root.isTemplate ? root.$content : root;
        while ($el = this.compileNode($el))
            ;
        // the flag should be passed correctly from rendering engine
        if (root.isTemplate && (flags & ViewCompileFlags.surrogate)) {
            this.compileSurrogate(root);
        }
        return definition;
    }
    compileNode($el) {
        const node = $el.node;
        const nextSibling = $el.nextSibling;
        switch (node.nodeType) {
            case 1 /* Element */:
                if ($el.isSlot) {
                    $el.$root.definition.hasSlots = true;
                }
                else if ($el.isLet) {
                    this.compileLetElement($el);
                }
                else if ($el.isCustomElement) {
                    this.compileCustomElement($el);
                }
                else {
                    this.compileElementNode($el);
                }
                if (!$el.isLifted) {
                    let $child = $el.firstChild || $el.$content;
                    while ($child) {
                        $child = this.compileNode($child);
                    }
                }
                return nextSibling;
            case 3 /* Text */:
                const expression = this.exprParser.parse($el.node.wholeText, 2048 /* Interpolation */);
                if (expression === null) {
                    while (($el = $el.nextSibling) && $el.node.nodeType === 3 /* Text */)
                        ;
                    return $el;
                }
                $el.replaceTextNodeWithMarker();
                $el.addInstructions([new TextBindingInstruction(expression)]);
                return nextSibling;
            case 8 /* Comment */:
                return nextSibling;
            case 9 /* Document */:
                return $el.firstChild;
            case 10 /* DocumentType */:
                return nextSibling;
            case 11 /* DocumentFragment */:
                return $el.firstChild;
        }
    }
    compileSurrogate($el) {
        const attributes = $el.$attributes;
        for (let i = 0, ii = attributes.length; i < ii; ++i) {
            const $attr = attributes[i];
            if ($attr.isTemplateController) {
                throw new Error('Cannot have template controller on surrogate element.');
            }
            const instruction = this.compileAttribute($attr);
            if (instruction !== null) {
                $el.definition.surrogates.push(instruction);
            }
            else {
                let attrInst;
                // Doesn't make sense for these properties as they need to be unique
                const name = $attr.target;
                if (name !== 'id' && name !== 'part' && name !== 'replace-part') {
                    switch (name) {
                        // TODO: handle simple surrogate style attribute
                        case 'style':
                            attrInst = new SetAttributeInstruction($attr.rawValue, name);
                            break;
                        default:
                            attrInst = new SetAttributeInstruction($attr.rawValue, name);
                    }
                    $el.definition.surrogates.push(attrInst);
                }
                else {
                    throw new Error(`Invalid surrogate attribute: ${name}`);
                }
            }
        }
    }
    compileElementNode($el) {
        if ($el.$attributes.length === 0) {
            return;
        }
        const attributes = $el.$attributes;
        const attributeInstructions = [];
        for (let i = 0, ii = attributes.length; i < ii; ++i) {
            const $attr = attributes[i];
            if ($attr.isProcessed)
                continue;
            $attr.markAsProcessed();
            if ($attr.isTemplateController) {
                let instruction = this.compileAttribute($attr);
                // compileAttribute will return a HydrateTemplateController if there is a binding command registered that produces one (in our case only "for")
                if (instruction.type !== "m" /* hydrateTemplateController */) {
                    const name = $attr.res;
                    instruction = new HydrateTemplateController({ name, instructions: [] }, name, [instruction], name === 'else');
                }
                // all attribute instructions preceding the template controller become children of the hydrate instruction
                instruction.instructions.push(...attributeInstructions);
                this.compileNode($el.lift(instruction));
                return;
            }
            else if ($attr.isCustomAttribute) {
                attributeInstructions.push(this.compileCustomAttribute($attr));
            }
            else {
                const instruction = this.compileAttribute($attr);
                if (instruction !== null) {
                    attributeInstructions.push(instruction);
                }
            }
        }
        if (attributeInstructions.length) {
            $el.addInstructions(attributeInstructions);
            $el.makeTarget();
        }
    }
    compileCustomElement($el) {
        if ($el.$attributes.length === 0) {
            $el.addInstructions([new HydrateElementInstruction($el.definition.name, PLATFORM.emptyArray)]);
            if ($el.definition.containerless) {
                $el.replaceNodeWithMarker();
            }
            else {
                $el.makeTarget();
            }
            return;
        }
        const attributeInstructions = [];
        // if there is a custom element, then only the attributes that map to bindables become children of the hydrate instruction,
        // otherwise they become sibling instructions; if there is no custom element, then sibling instructions are never appended to
        const siblingInstructions = [];
        const attributes = $el.$attributes;
        for (let i = 0, ii = attributes.length; i < ii; ++i) {
            const $attr = attributes[i];
            if ($attr.isProcessed)
                continue;
            $attr.markAsProcessed();
            if ($attr.isTemplateController) {
                let instruction = this.compileAttribute($attr);
                // compileAttribute will return a HydrateTemplateController if there is a binding command registered that produces one (in our case only "for")
                if (instruction.type !== "m" /* hydrateTemplateController */) {
                    const name = $attr.res;
                    instruction = new HydrateTemplateController({ name, instructions: [] }, name, [instruction], name === 'else');
                }
                // all attribute instructions preceding the template controller become children of the hydrate instruction
                instruction.instructions.push(...attributeInstructions);
                this.compileNode($el.lift(instruction));
                return;
            }
            else if ($attr.isCustomAttribute) {
                if ($attr.isAttributeBindable) {
                    siblingInstructions.push(this.compileCustomAttribute($attr));
                }
                else {
                    attributeInstructions.push(this.compileCustomAttribute($attr));
                }
            }
            else {
                const instruction = this.compileAttribute($attr);
                if (instruction !== null) {
                    if (!$attr.isElementBindable) {
                        siblingInstructions.push(instruction);
                    }
                    else {
                        attributeInstructions.push(instruction);
                    }
                }
            }
        }
        $el.addInstructions([new HydrateElementInstruction($el.definition.name, attributeInstructions), ...siblingInstructions]);
        if ($el.definition.containerless) {
            $el.replaceNodeWithMarker();
        }
        else {
            $el.makeTarget();
        }
    }
    compileCustomAttribute($attr) {
        const childInstructions = [];
        if ($attr.isMultiAttrBinding) {
            const mBindings = $attr.$multiAttrBindings;
            for (let j = 0, jj = mBindings.length; j < jj; ++j) {
                childInstructions.push(this.compileAttribute(mBindings[j]));
            }
        }
        else {
            childInstructions.push(this.compileAttribute($attr));
        }
        return new HydrateAttributeInstruction($attr.res, childInstructions);
    }
    compileLetElement($el) {
        const letInstructions = [];
        const attributes = $el.$attributes;
        let toViewModel = false;
        for (let i = 0, ii = attributes.length; ii > i; ++i) {
            const $attr = attributes[i];
            const to = PLATFORM.camelCase($attr.to);
            if ($attr.hasBindingCommand) {
                const expr = this.exprParser.parse($attr.rawValue, 53 /* BindCommand */);
                letInstructions.push(new LetBindingInstruction(expr, to));
            }
            else if ($attr.rawName === 'to-view-model') {
                toViewModel = true;
                $el.node.removeAttribute('to-view-model');
            }
            else {
                const expr = this.exprParser.parse($attr.rawValue, 2048 /* Interpolation */);
                if (expr === null) {
                    // Should just be a warning, but throw for now
                    throw new Error(`Invalid let binding. String liternal given for attribute: ${$attr.to}`);
                }
                letInstructions.push(new LetBindingInstruction(expr, to));
            }
        }
        $el.addInstructions([new LetElementInstruction(letInstructions, toViewModel)]);
        // theoretically there's no need to replace, but to keep it consistent
        $el.replaceNodeWithMarker();
    }
    compileAttribute($attr) {
        // binding commands get priority over all; they may override default behaviors
        // it is the responsibility of the implementor to ensure they filter out stuff they shouldn't override
        if ($attr.isHandledByBindingCommand) {
            return $attr.command.compile($attr);
        }
        // simple path for ref binding
        const parser = this.exprParser;
        if ($attr.target === 'ref') {
            return new RefBindingInstruction(parser.parse($attr.rawValue, 1280 /* IsRef */));
        }
        // simple path for style bindings (TODO: this doesnt work, but we need to use StylePropertyBindingInstruction right?)
        // if (target === 'style' || target === 'css') {
        //   const expression = parser.parse(value, BindingType.Interpolation);
        //   if (expression === null) {
        //     return null;
        //   }
        //   return new StylePropertyBindingInstruction(expression, target);
        // }
        // plain custom attribute on any kind of element
        if ($attr.isCustomAttribute) {
            if (!$attr.hasBindingCommand) {
                const expression = parser.parse($attr.rawValue, 2048 /* Interpolation */);
                if (expression !== null) {
                    return new InterpolationInstruction(expression, $attr.to);
                }
                if ($attr.isMultiAttrBinding) {
                    return new SetPropertyInstruction($attr.rawValue, $attr.to);
                }
            }
            // intentional nested block without a statement to ensure the expression variable isn't shadowed
            // (we're not declaring it at the outer block for better typing without explicit casting)
            {
                const expression = parser.parse($attr.rawValue, 50 /* ToViewCommand */);
                switch ($attr.mode) {
                    case BindingMode.oneTime:
                        return new OneTimeBindingInstruction(expression, $attr.to);
                    case BindingMode.fromView:
                        return new FromViewBindingInstruction(expression, $attr.to);
                    case BindingMode.twoWay:
                        return new TwoWayBindingInstruction(expression, $attr.to);
                    case BindingMode.toView:
                    default:
                        return new ToViewBindingInstruction(expression, $attr.to);
                }
            }
        }
        // plain attribute on a custom element
        if ($attr.onCustomElement) {
            // bindable attribute
            if ($attr.isElementBindable) {
                const expression = parser.parse($attr.rawValue, 2048 /* Interpolation */);
                if (expression === null) {
                    // no interpolation -> make it a setProperty on the component
                    return new SetPropertyInstruction($attr.rawValue, $attr.to);
                }
                // interpolation -> behave like toView (e.g. foo="${someProp}")
                return new InterpolationInstruction(expression, $attr.to);
            }
        }
        {
            // plain attribute on a normal element
            const expression = parser.parse($attr.rawValue, 2048 /* Interpolation */);
            if (expression === null) {
                // no interpolation -> do not return an instruction
                return null;
            }
            // interpolation -> behave like toView (e.g. id="${someId}")
            return new InterpolationInstruction(expression, $attr.to);
        }
    }
};
TemplateCompiler = __decorate([
    inject(IExpressionParser, IElementParser, IAttributeParser)
], TemplateCompiler);

const globalResources = [
    Compose,
    If,
    Else,
    Repeat,
    Replaceable,
    With,
    SanitizeValueConverter,
    AttrBindingBehavior,
    DebounceBindingBehavior,
    OneTimeBindingBehavior,
    ToViewBindingBehavior,
    FromViewBindingBehavior,
    SelfBindingBehavior,
    SignalBindingBehavior,
    ThrottleBindingBehavior,
    TwoWayBindingBehavior,
    UpdateTriggerBindingBehavior
];
const defaultBindingLanguage = [
    DefaultBindingCommand,
    OneTimeBindingCommand,
    ToViewBindingCommand,
    FromViewBindingCommand,
    TwoWayBindingCommand,
    TriggerBindingCommand,
    DelegateBindingCommand,
    CaptureBindingCommand,
    CallBindingCommand,
    ForBindingCommand
];
const BasicConfiguration = {
    register(container) {
        container.register(ParserRegistration, Registration.singleton(ITemplateCompiler, TemplateCompiler), ...globalResources, ...defaultBindingLanguage);
    }
};

export { AttrSyntax, IAttributeParser, AttributeParser, bindingCommand, BindingCommandResource, OneTimeBindingCommand, ToViewBindingCommand, FromViewBindingCommand, TwoWayBindingCommand, DefaultBindingCommand, TriggerBindingCommand, DelegateBindingCommand, CaptureBindingCommand, CallBindingCommand, ForBindingCommand, unescapeCode, BasicConfiguration, ElementSyntax, IElementParser, ElementParser, ParserRegistration, ParserState, parseCore, parse, TextBindingInstruction, InterpolationInstruction, OneTimeBindingInstruction, ToViewBindingInstruction, FromViewBindingInstruction, TwoWayBindingInstruction, IteratorBindingInstruction, TriggerBindingInstruction, DelegateBindingInstruction, CaptureBindingInstruction, CallBindingInstruction, RefBindingInstruction, StylePropertyBindingInstruction, SetPropertyInstruction, SetAttributeInstruction, HydrateElementInstruction, HydrateAttributeInstruction, HydrateTemplateController, LetElementInstruction, LetBindingInstruction, SemanticModel, MultiAttributeBindingSymbol, AttributeSymbol, ElementSymbol, TemplateCompiler };
//# sourceMappingURL=index.es6.js.map
