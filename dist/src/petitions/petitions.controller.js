"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionsController = void 0;
const common_1 = require("@nestjs/common");
const petitions_service_1 = require("./petitions.service");
const create_petition_dto_1 = require("./dto/create-petition.dto");
const update_petition_dto_1 = require("./dto/update-petition.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PetitionsController = class PetitionsController {
    petitionsService;
    constructor(petitionsService) {
        this.petitionsService = petitionsService;
    }
    create(req, dto) {
        return this.petitionsService.create(req.user.id, dto);
    }
    saveDraft(req, dto) {
        return this.petitionsService.saveDraft(req.user.id, dto);
    }
    activateDraft(id, req) {
        return this.petitionsService.activateDraft(id, req.user.id);
    }
    findAll(req) {
        return this.petitionsService.findAllByUser(req.user.id);
    }
    findActive(req) {
        return this.petitionsService.findActive(req.user.id);
    }
    findArchived(req) {
        return this.petitionsService.findArchived(req.user.id);
    }
    findDrafts(req) {
        return this.petitionsService.findDrafts(req.user.id);
    }
    getFavorites(req) {
        return this.petitionsService.getFavorites(req.user.id);
    }
    findOne(id, req) {
        return this.petitionsService.findOne(id, req.user.id);
    }
    update(id, req, dto) {
        return this.petitionsService.update(id, req.user.id, dto);
    }
    archive(id, req) {
        return this.petitionsService.archive(id, req.user.id);
    }
    remove(id, req) {
        return this.petitionsService.remove(id, req.user.id);
    }
    addFavorite(id, req) {
        return this.petitionsService.addFavorite(req.user.id, id);
    }
    removeFavorite(id, req) {
        return this.petitionsService.removeFavorite(req.user.id, id);
    }
    async canExport(_id, req) {
        const canExport = await this.petitionsService.canExportPdf(req.user.id);
        if (!canExport) {
            throw new common_1.ForbiddenException('Seu plano não permite exportação de PDF. Faça upgrade.');
        }
        return { canExport: true };
    }
    async canExportWord(_id, req) {
        const canExport = await this.petitionsService.canExportWord(req.user.id);
        if (!canExport) {
            throw new common_1.ForbiddenException('Seu plano não permite exportação de Word. Faça upgrade.');
        }
        return { canExport: true };
    }
    getPermissions(req) {
        return this.petitionsService.getUserPermissions(req.user.id);
    }
};
exports.PetitionsController = PetitionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_petition_dto_1.CreatePetitionDto]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('draft'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_petition_dto_1.CreatePetitionDto]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "saveDraft", null);
__decorate([
    (0, common_1.Post)(':id/activate'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "activateDraft", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('archived'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "findArchived", null);
__decorate([
    (0, common_1.Get)('drafts'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "findDrafts", null);
__decorate([
    (0, common_1.Get)('favorites'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_petition_dto_1.UpdatePetitionDto]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/archive'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "archive", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/favorite'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(':id/favorite'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "removeFavorite", null);
__decorate([
    (0, common_1.Get)(':id/can-export'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PetitionsController.prototype, "canExport", null);
__decorate([
    (0, common_1.Get)(':id/can-export-word'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PetitionsController.prototype, "canExportWord", null);
__decorate([
    (0, common_1.Get)('permissions/me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PetitionsController.prototype, "getPermissions", null);
exports.PetitionsController = PetitionsController = __decorate([
    (0, common_1.Controller)('petitions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [petitions_service_1.PetitionsService])
], PetitionsController);
//# sourceMappingURL=petitions.controller.js.map