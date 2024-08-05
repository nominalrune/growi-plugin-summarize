import config from './package.json';
import { Summary } from './src/components/Summary';
import { remarkSummaryPlugin } from './src/sevices/summary';
import { Options, Func, ViewOptions } from './types/utils';

declare const growiFacade : {
  markdownRenderer?: {
    optionsGenerators: {
      customGenerateViewOptions: (path: string, options: Options, toc: Func) => ViewOptions,
      generateViewOptions: (path: string, options: Options, toc: Func) => ViewOptions,
    },
  },
};

const activate = (): void => {
  if (growiFacade == null || growiFacade.markdownRenderer == null) {
    return;
  }

  const { optionsGenerators } = growiFacade.markdownRenderer;

  optionsGenerators.customGenerateViewOptions = (...args) => {
    const options = optionsGenerators.generateViewOptions(...args);
    //@ts-expect-error
    options.components.summary = Summary(options.components.summary); // Wrap the default component
    //@ts-expect-error
    options.remarkPlugins.push([remarkSummaryPlugin]);
    console.log(options);
    return options;
  };
};

const deactivate = (): void => {
};

// register activate
if ((window as any).pluginActivators == null) {
  (window as any).pluginActivators = {};
}
(window as any).pluginActivators[config.name] = {
  activate,
  deactivate,
};
