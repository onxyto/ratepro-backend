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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var nutrition_entities_1 = require("./nutrition.entities");
var ingredient_entities_1 = require("./ingredient.entities");
var product_type_enum_1 = require("../../shared/enums/product-type.enum");
var user_entities_1 = require("../../user/entities/user.entities");
var Product = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = typeorm_1.BaseEntity;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _ean_decorators;
    var _ean_initializers = [];
    var _ean_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _image_url_decorators;
    var _image_url_initializers = [];
    var _image_url_extraInitializers = [];
    var _rating_decorators;
    var _rating_initializers = [];
    var _rating_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _nutritions_decorators;
    var _nutritions_initializers = [];
    var _nutritions_extraInitializers = [];
    var _ingredients_decorators;
    var _ingredients_initializers = [];
    var _ingredients_extraInitializers = [];
    var _users_decorators;
    var _users_initializers = [];
    var _users_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _storage_type_decorators;
    var _storage_type_initializers = [];
    var _storage_type_extraInitializers = [];
    var _recommended_decorators;
    var _recommended_initializers = [];
    var _recommended_extraInitializers = [];
    var _deleted_decorators;
    var _deleted_initializers = [];
    var _deleted_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var Product = _classThis = /** @class */ (function (_super) {
        __extends(Product_1, _super);
        function Product_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = __runInitializers(_this, _id_initializers, void 0);
            _this.ean = (__runInitializers(_this, _id_extraInitializers), __runInitializers(_this, _ean_initializers, void 0));
            _this.name = (__runInitializers(_this, _ean_extraInitializers), __runInitializers(_this, _name_initializers, void 0));
            _this.title = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _title_initializers, void 0));
            _this.image_url = (__runInitializers(_this, _title_extraInitializers), __runInitializers(_this, _image_url_initializers, void 0));
            _this.rating = (__runInitializers(_this, _image_url_extraInitializers), __runInitializers(_this, _rating_initializers, void 0));
            _this.type = (__runInitializers(_this, _rating_extraInitializers), __runInitializers(_this, _type_initializers, void 0));
            _this.nutritions = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _nutritions_initializers, void 0));
            _this.ingredients = (__runInitializers(_this, _nutritions_extraInitializers), __runInitializers(_this, _ingredients_initializers, void 0));
            _this.users = (__runInitializers(_this, _ingredients_extraInitializers), __runInitializers(_this, _users_initializers, void 0));
            _this.description = (__runInitializers(_this, _users_extraInitializers), __runInitializers(_this, _description_initializers, void 0));
            _this.storage_type = (__runInitializers(_this, _description_extraInitializers), __runInitializers(_this, _storage_type_initializers, void 0));
            _this.recommended = (__runInitializers(_this, _storage_type_extraInitializers), __runInitializers(_this, _recommended_initializers, void 0));
            _this.deleted = (__runInitializers(_this, _recommended_extraInitializers), __runInitializers(_this, _deleted_initializers, void 0));
            _this.created_at = (__runInitializers(_this, _deleted_extraInitializers), __runInitializers(_this, _created_at_initializers, void 0));
            _this.updated_at = (__runInitializers(_this, _created_at_extraInitializers), __runInitializers(_this, _updated_at_initializers, void 0));
            __runInitializers(_this, _updated_at_extraInitializers);
            return _this;
        }
        return Product_1;
    }(_classSuper));
    __setFunctionName(_classThis, "Product");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _ean_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _name_decorators = [(0, typeorm_1.Column)()];
        _title_decorators = [(0, typeorm_1.Column)()];
        _image_url_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _rating_decorators = [(0, typeorm_1.Column)({ type: 'bigint' })];
        _type_decorators = [(0, typeorm_1.Column)({ type: 'enum', enum: product_type_enum_1.ProductTypeEnum, default: product_type_enum_1.ProductTypeEnum.NONE })];
        _nutritions_decorators = [(0, typeorm_1.OneToMany)(function () { return nutrition_entities_1.Nutrition; }, function (nutrition) { return nutrition.product; }, { cascade: true })];
        _ingredients_decorators = [(0, typeorm_1.OneToMany)(function () { return ingredient_entities_1.Ingredient; }, function (ingredient) { return ingredient.product; }, { cascade: true })];
        _users_decorators = [(0, typeorm_1.ManyToMany)(function () { return user_entities_1.User; }, function (user) { return user.products; }, {
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
            })];
        _description_decorators = [(0, typeorm_1.Column)()];
        _storage_type_decorators = [(0, typeorm_1.Column)()];
        _recommended_decorators = [(0, typeorm_1.Column)()];
        _deleted_decorators = [(0, typeorm_1.Column)()];
        _created_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        _updated_at_decorators = [(0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _ean_decorators, { kind: "field", name: "ean", static: false, private: false, access: { has: function (obj) { return "ean" in obj; }, get: function (obj) { return obj.ean; }, set: function (obj, value) { obj.ean = value; } }, metadata: _metadata }, _ean_initializers, _ean_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _image_url_decorators, { kind: "field", name: "image_url", static: false, private: false, access: { has: function (obj) { return "image_url" in obj; }, get: function (obj) { return obj.image_url; }, set: function (obj, value) { obj.image_url = value; } }, metadata: _metadata }, _image_url_initializers, _image_url_extraInitializers);
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: function (obj) { return "rating" in obj; }, get: function (obj) { return obj.rating; }, set: function (obj, value) { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _nutritions_decorators, { kind: "field", name: "nutritions", static: false, private: false, access: { has: function (obj) { return "nutritions" in obj; }, get: function (obj) { return obj.nutritions; }, set: function (obj, value) { obj.nutritions = value; } }, metadata: _metadata }, _nutritions_initializers, _nutritions_extraInitializers);
        __esDecorate(null, null, _ingredients_decorators, { kind: "field", name: "ingredients", static: false, private: false, access: { has: function (obj) { return "ingredients" in obj; }, get: function (obj) { return obj.ingredients; }, set: function (obj, value) { obj.ingredients = value; } }, metadata: _metadata }, _ingredients_initializers, _ingredients_extraInitializers);
        __esDecorate(null, null, _users_decorators, { kind: "field", name: "users", static: false, private: false, access: { has: function (obj) { return "users" in obj; }, get: function (obj) { return obj.users; }, set: function (obj, value) { obj.users = value; } }, metadata: _metadata }, _users_initializers, _users_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _storage_type_decorators, { kind: "field", name: "storage_type", static: false, private: false, access: { has: function (obj) { return "storage_type" in obj; }, get: function (obj) { return obj.storage_type; }, set: function (obj, value) { obj.storage_type = value; } }, metadata: _metadata }, _storage_type_initializers, _storage_type_extraInitializers);
        __esDecorate(null, null, _recommended_decorators, { kind: "field", name: "recommended", static: false, private: false, access: { has: function (obj) { return "recommended" in obj; }, get: function (obj) { return obj.recommended; }, set: function (obj, value) { obj.recommended = value; } }, metadata: _metadata }, _recommended_initializers, _recommended_extraInitializers);
        __esDecorate(null, null, _deleted_decorators, { kind: "field", name: "deleted", static: false, private: false, access: { has: function (obj) { return "deleted" in obj; }, get: function (obj) { return obj.deleted; }, set: function (obj, value) { obj.deleted = value; } }, metadata: _metadata }, _deleted_initializers, _deleted_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Product = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Product = _classThis;
}();
exports.Product = Product;
