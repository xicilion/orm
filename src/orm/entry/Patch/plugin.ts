import { patchModelAfterDefine, patchHooksInModelOptions } from "./utils";

export default function (
    orm: FxOrmNS.ORM,
    plugin_opts: {
        enable: boolean
    }
): FxOrmNS.Plugin {
	function beforeDefine (name: string, properties: FxOrmNS.ModelPropertyDefinitionHash, opts: FxOrmNS.ModelOptions) {
        opts.hooks = opts.hooks || {};
        
        patchHooksInModelOptions(opts);
    }

    function define (m: FxOrmModel.Model) {
        patchModelAfterDefine(m);
    }

    return {
        beforeDefine,
        define
    }
}