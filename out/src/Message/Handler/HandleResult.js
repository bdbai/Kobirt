"use strict";
var HandleResult;
(function (HandleResult) {
    // 消息未处理
    HandleResult[HandleResult["Skipped"] = 0] = "Skipped";
    // 消息已处理
    HandleResult[HandleResult["Handled"] = 1] = "Handled";
    // 处理并改变了原消息
    HandleResult[HandleResult["Changed"] = 2] = "Changed";
})(HandleResult || (HandleResult = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HandleResult;
//# sourceMappingURL=HandleResult.js.map