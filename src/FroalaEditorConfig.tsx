import { DEEPLINKS } from './constants';

/**
 * @see https://github.com/froala/react-froala-wysiwyg
 * @see https://froala.com/wysiwyg-editor/docs/options/
 * @see https://froala.com/wysiwyg-editor/docs/events/
 */
export default {
  // TODO: Change env variable with deployments
  theme: 'light',
  heightMin: 350,
  heightMax: '100%',
  language: 'ko',
  attribution: false,
  quickInsertEnabled: false,
  charCounterCount: false,
  toolbarButtons: [
    'fullscreen',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    '|',
    'fontSize',
    'color',
    '|',
    'paragraphFormat',
    'align',
    'formatOL',
    'formatUL',
    'outdent',
    'indent',
    '-',
    'insertLink',
    'insertImage',
    'insertVideo',
    'insertTable',
    '|',
    'emoticons',
    'insertHR',
    'selectAll',
    'clearFormatting',
    '|',
    'html',
    'undo',
    'redo',
  ],
  // toolbarButtons: {
  //   moreText: {
  //     buttons: [
  //       'bold',
  //       'italic',
  //       'underline',
  //       'strikeThrough',
  //       'subscript',
  //       'superscript',
  //       'fontFamily',
  //       'fontSize',
  //       'textColor',
  //       'backgroundColor',
  //       'clearFormatting',
  //     ],
  //     align: 'left',
  //     buttonsVisible: 2,
  //   },
  //   moreParagraph: {
  //     buttons: [
  //       'alignLeft',
  //       'alignCenter',
  //       'formatOLSimple',
  //       'alignRight',
  //       'alignJustify',
  //       'formatOL',
  //       'formatUL',
  //       'paragraphStyle',
  //       'lineHeight',
  //       'outdent',
  //       'indent',
  //       'quote',
  //     ],
  //     align: 'left',
  //     buttonsVisible: 2,
  //   },
  //   moreRich: {
  //     buttons: [
  //       'insertLink',
  //       'insertImage',
  //       'insertVideo',
  //       'emoticons',
  //       'specialCharacters',
  //       'embedly',
  //     ],
  //     align: 'left',
  //     buttonsVisible: 2,
  //   },
  //   moreMisc: {
  //     buttons: ['undo', 'redo', 'fullscreen'],
  //     align: 'right',
  //     buttonsVisible: 3,
  //   },
  // },
  // VIDEO
  videoInsertButtons: ['videoBack', '|', 'videoByURL'],
  videoResponsive: true,
  videoUploadParam: '',
  videoUploadParams: null,
  // IMAGES
  imageInsertButtons: ['imageBack', '|', 'imageByURL', 'imageUpload'],
  imageUploadURL: DEEPLINKS.API_UPLOAD.THUMBNAIL,
  imageUploadParam: 'file',
};
