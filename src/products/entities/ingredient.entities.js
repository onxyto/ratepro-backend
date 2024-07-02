"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingredient = void 0;
var typeorm_1 = require("typeorm");
var product_entities_1 = require("./product.entities"); // Assuming your product entity is named 'product.entities'
var Ingredient = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('ingredients')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = typeorm_1.BaseEntity;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _risk_rate_decorators;
    var _risk_rate_initializers = [];
    var _risk_rate_extraInitializers = [];
    var _health_risk_decorators;
    var _health_risk_initializers = [];
    var _health_risk_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _scientific_sources_decorators;
    var _scientific_sources_initializers = [];
    var _scientific_sources_extraInitializers = [];
    var _deleted_decorators;
    var _deleted_initializers = [];
    var _deleted_extraInitializers = [];
    var _product_decorators;
    var _product_initializers = [];
    var _product_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var Ingredient = _classThis = /** @class */ (function (_super) {
        __extends(Ingredient_1, _super);
        function Ingredient_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = __runInitializers(_this, _id_initializers, void 0);
            _this.name = (__runInitializers(_this, _id_extraInitializers), __runInitializers(_this, _name_initializers, void 0));
            _this.risk_rate = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _risk_rate_initializers, void 0)); // Change to 'bigint' if needed
            _this.health_risk = (__runInitializers(_this, _risk_rate_extraInitializers), __runInitializers(_this, _health_risk_initializers, void 0));
            _this.description = (__runInitializers(_this, _health_risk_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
            _this.scientific_sources = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _scientific_sources_initializers, void 0));
            _this.deleted = (__runInitializers(_this, _scientific_sources_extraInitializers), __runInitializers(_this, _deleted_initializers, void 0));
            _this.product = (__runInitializers(_this, _deleted_extraInitializers), __runInitializers(_this, _product_initializers, void 0));
            _this.created_at = (__runInitializers(_this, _product_extraInitializers), __runInitializers(_this, _created_at_initializers, void 0));
            _this.updated_at = (__runInitializers(_this, _created_at_extraInitializers), __runInitializers(_this, _updated_at_initializers, void 0));
            __runInitializers(_this, _updated_at_extraInitializers);
            return _this;
        }
        return Ingredient_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Ingredient");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)()];
        _risk_rate_decorators = [(0, typeorm_1.Column)()];
        _health_risk_decorators = [(0, typeorm_1.Column)()];
        _description_decorators = [(0, typeorm_1.Column)()];
        _scientific_sources_decorators = [(0, typeorm_1.Column)()];
        _deleted_decorators = [(0, typeorm_1.Column)()];
        _product_decorators = [(0, typeorm_1.ManyToOne)(function () { return product_entities_1.Product; }, function (product) { return product.ingredients; }, { nullable: true })];
        _created_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _updated_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _risk_rate_decorators, { kind: "field", name: "risk_rate", static: false, private: false, access: { has: function (obj) { return "risk_rate" in obj; }, get: function (obj) { return obj.risk_rate; }, set: function (obj, value) { obj.risk_rate = value; } }, metadata: _metadata }, _risk_rate_initializers, _risk_rate_extraInitializers);
        __esDecorate(null, null, _health_risk_decorators, { kind: "field", name: "health_risk", static: false, private: false, access: { has: function (obj) { return "health_risk" in obj; }, get: function (obj) { return obj.health_risk; }, set: function (obj, value) { obj.health_risk = value; } }, metadata: _metadata }, _health_risk_initializers, _health_risk_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _scientific_sources_decorators, { kind: "field", name: "scientific_sources", static: false, private: false, access: { has: function (obj) { return "scientific_sources" in obj; }, get: function (obj) { return obj.scientific_sources; }, set: function (obj, value) { obj.scientific_sources = value; } }, metadata: _metadata }, _scientific_sources_initializers, _scientific_sources_extraInitializers);
        __esDecorate(null, null, _deleted_decorators, { kind: "field", name: "deleted", static: false, private: false, access: { has: function (obj) { return "deleted" in obj; }, get: function (obj) { return obj.deleted; }, set: function (obj, value) { obj.deleted = value; } }, metadata: _metadata }, _deleted_initializers, _deleted_extraInitializers);
        __esDecorate(null, null, _product_decorators, { kind: "field", name: "product", static: false, private: false, access: { has: function (obj) { return "product" in obj; }, get: function (obj) { return obj.product; }, set: function (obj, value) { obj.product = value; } }, metadata: _metadata }, _product_initializers, _product_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Ingredient = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Ingredient = _classThis;
}();
exports.Ingredient = Ingredient;
