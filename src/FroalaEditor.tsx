/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import loadable from '@loadable/component';
import equals from 'fast-deep-equal';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/themes/dark.min.css';

import FroalaEditorJS from 'froala-editor';

loadable.lib<any>(() => import('froala-editor/js/froala_editor.min'));
loadable.lib<any>(() => import('froala-editor/js/plugins.pkgd.min'));
loadable.lib<any>(() => import('froala-editor/js/froala_editor.pkgd.min'));
loadable.lib<any>(() => import('froala-editor/js/languages/ko'));

export interface FroalaProps {
  tag?: string;

  config?: any;

  model?: string | Object | null;

  onManualControllerReady?: (...args: any[]) => void;

  onModelChange?: (...args: any[]) => void;
}

const SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
const INNER_HTML_ATTR = 'innerHTML';

class FroalaEditor extends React.Component<FroalaProps> {
  tag: string;

  listeningEvents: any[];

  element: HTMLElement | null;

  editor: any; // FroalaEditorJS

  config: any;

  editorInitialized: boolean;

  hasSpecialTag: boolean;

  oldModel: any | null;

  private _initEvents?: any[];

  constructor(props: FroalaProps) {
    super(props);
    this.tag = props.tag || 'div';
    this.listeningEvents = [];
    // Jquery wrapped element.
    this.element = null;
    // Editor element.
    this.editor = null;
    // Editor options config
    this.config = {
      immediateReactModelUpdate: false,
      reactIgnoreAttrs: null,
    };
    this.editorInitialized = false;
    this.hasSpecialTag = false;
    this.oldModel = null;
  }

  componentDidMount() {
    if (this.element) {
      const tagName = this.element.tagName.toLowerCase();
      if (SPECIAL_TAGS.indexOf(tagName) !== -1) {
        this.tag = tagName;
        this.hasSpecialTag = true;
      }
      const { onManualControllerReady } = this.props;
      if (onManualControllerReady) {
        this.generateManualController();
      } else {
        this.createEditor();
      }
    }
  }

  componentDidUpdate() {
    const { model } = this.props;
    if (equals(this.oldModel, model)) {
      return;
    }
    this.setContent();
  }

  componentWillUnmount() {
    this.destroyEditor();
  }

  getEditor() {
    if (this.element) {
      return this.editor;
    }
    return null;
  }

  setContent(firstTime?: boolean) {
    const { model } = this.props;

    if (model) {
      this.oldModel = model;
      if (this.hasSpecialTag) {
        this.setSpecialTagContent();
      } else {
        this.setNormalTagContent(firstTime);
      }
    }
  }

  setSpecialTagContent() {
    const { model } = this.props;
    const tags = model;

    // add tags on element
    if (tags && typeof tags === 'object' && this.element) {
      // eslint-disable-next-line no-restricted-syntax
      for (const attr in tags) {
        // eslint-disable-next-line no-prototype-builtins
        if (tags.hasOwnProperty(attr) && attr !== INNER_HTML_ATTR) {
          this.element.setAttribute(attr, tags[attr]);
        }
      }
      // eslint-disable-next-line no-prototype-builtins
      if (tags.hasOwnProperty(INNER_HTML_ATTR)) {
        this.element.innerHTML = tags[INNER_HTML_ATTR];
      }
    }
  }

  setNormalTagContent(firstTime?: boolean) {
    if (firstTime) {
      if (this.config.initOnClick) {
        this.registerEvent('initializationDelayed', () => {
          this.htmlSet();
        });
        this.registerEvent('initialized', () => {
          this.editorInitialized = true;
        });
      } else {
        this.registerEvent('initialized', () => {
          this.editorInitialized = true;
          this.htmlSet();
        });
      }
    } else {
      this.htmlSet();
    }
  }

  // register event on jquery editor element
  registerEvent(eventName?: string, callback?: (...args: any[]) => void) {
    if (!eventName || !callback) {
      return;
    }

    if (eventName === 'initialized') {
      if (!this._initEvents) {
        this._initEvents = [];
      }
      this._initEvents.push(callback);
    } else {
      if (!this.config.events) {
        this.config.events = {};
      }
      this.config.events[eventName] = callback;
    }
  }

  createEditor() {
    if (this.editorInitialized) {
      return;
    }

    const { model } = this.props;
    if (model && typeof model === 'string' && this.element) {
      this.element.innerHTML = model;
    }
    this.setContent(true);
    this.registerEvent('initialized', this.config.events && this.config.events.initialized);

    // Check if events are set.
    if (!this.config.events) {
      this.config.events = {};
    }
    this.config.events.initialized = () => this.initListeners();
    this.editor = new FroalaEditorJS(this.element, this.config);
  }

  htmlSet() {
    if (typeof window !== 'undefined') {
      if (this.editor.html && this.editor.html.set) {
        const { model = '' } = this.props;
        this.editor.html.set(model);
      }

      if (this.editorInitialized && this.editor.undo) {
        // This will reset the undo stack everytime the model changes externally. Can we fix this?
        this.editor.undo.reset();
        this.editor.undo.saveStep();
      }
    }
  }

  destroyEditor() {
    if (this.element) {
      if (this.editor.destroy) {
        this.editor.destroy();
      }
      this.listeningEvents.length = 0;
      this.element = null;
      this.editorInitialized = false;
    }
  }

  generateManualController() {
    const { onManualControllerReady } = this.props;
    const controls = {
      initialize: () => this.createEditor.call(this),
      destroy: () => this.destroyEditor.call(this),
      getEditor: () => this.getEditor.call(this),
    };
    if (onManualControllerReady) {
      onManualControllerReady(controls);
    }
  }

  updateModel() {
    const { onModelChange } = this.props;
    if (!onModelChange) {
      return;
    }

    let modelContent: any = '';
    if (this.hasSpecialTag && this.element) {
      const attributeNodes = this.element.attributes;
      const attrs = {};

      for (let i = 0; i < attributeNodes.length; i += 1) {
        const attrName = attributeNodes[i].name;
        if (this.config.reactIgnoreAttrs && this.config.reactIgnoreAttrs.indexOf(attrName) !== -1) {
          continue;
        }
        attrs[attrName] = attributeNodes[i].value;
      }

      if (this.element.innerHTML) {
        attrs[INNER_HTML_ATTR] = this.element.innerHTML;
      }

      modelContent = attrs;
    } else {
      const returnedHtml = this.editor.html.get();
      if (typeof returnedHtml === 'string') {
        modelContent = returnedHtml;
      }
    }

    this.oldModel = modelContent;
    onModelChange(modelContent);
  }

  initListeners() {
    // bind contentChange and keyup event to froalaModel
    if (this.editor) {
      this.editor.events.on('contentChanged', () => {
        this.updateModel();
      });
      if (this.config.immediateReactModelUpdate) {
        this.editor.events.on('keyup', () => {
          this.updateModel();
        });
      }

      // Call init events.
      if (this._initEvents) {
        for (let i = 0; i < this._initEvents.length; i += 1) {
          this._initEvents[i].call(this.editor);
        }
      }
    }
  }

  render() {
    const { children } = this.props;
    return (
      // @ts-ignore
      <this.tag
        ref={(el) => {
          this.element = el;
        }}
      >
        {children}
      </this.tag>
    );
  }
}

export default FroalaEditor;
