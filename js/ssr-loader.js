module.exports = function (content) {
    let moduleName = this._module.rawRequest;
    // console.log(moduleName);
    let index = this.query.excludedModules.indexOf(moduleName);

    if (index !== -1) {
        return '';
    }
    if (moduleName === './util/root') {
        return 'exports.root = global';
    }

    return content;
};
