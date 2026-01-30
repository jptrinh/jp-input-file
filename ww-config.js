export default {
    editor: {
        label: 'File Upload',
        icon: 'upload',
        bubble: { icon: 'upload' },
        customSettingsPropertiesOrder: [
            // Initial state
            'initialValue',
            // UX properties
            'type',
            'drop',
            'reorder',
            'maxFileSize',
            'minFileSize',
            'maxTotalFileSize',
            'maxFiles',
            'required',
            'readonly',
            'extensions',
            'customExtensions',
            'exposeBase64',
            'exposeBinary',
            ['formInfobox', 'fieldName', 'customValidation', 'validation'],
            // Error messages
            {
                label: 'Error messages',
                isCollapsible: true,
                properties: [
                    'errorMsgMultipleFiles',
                    'errorMsgMaxFilesReached',
                    'errorMsgTooManyFiles',
                    'errorMsgFileTooSmall',
                    'errorMsgFileTooLarge',
                    'errorMsgTotalSizeExceeded',
                    'errorMsgInvalidType',
                ],
            },
        ],
        customStylePropertiesOrder: [],
        hint: (_, sidePanelContent) => {
            if (!sidePanelContent.parentSelection) return null;
            const { header, text, button, args } = sidePanelContent.parentSelection;
            const sections = ['style', 'settings'];
            return sections.map(section => ({
                section,
                header: header,
                text: text,
                button: {
                    text: button,
                    action: 'selectParent',
                    args,
                },
            }));
        },
    },
    states: ['dragging'],
    options: {
        displayAllowedValues: ['flex', 'inline-flex', 'block'],
    },
    triggerEvents: [
        {
            name: 'change',
            label: { en: 'On change' },
            event: { value: [] },
            default: true,
        },
        {
            name: 'error',
            label: { en: 'On error' },
            event: {
                code: 'VALIDATION_ERROR',
                data: { message: 'File validation failed' },
            },
        },
    ],
    actions: [
        {
            label: { en: 'Clear Files' },
            action: 'clearFiles',
        },
        {
            label: { en: 'Clear Error' },
            action: 'clearError',
        },
        {
            label: { en: 'Remove File' },
            action: 'removeFile',
            args: [
                {
                    name: 'index',
                    type: 'Number',
                    label: { en: 'File index' },
                },
            ],
        },
        {
            label: { en: 'Reorder Files' },
            action: 'reorderFiles',
            args: [
                {
                    name: 'fromIndex',
                    type: 'Number',
                    label: { en: 'From index' },
                },
                {
                    name: 'toIndex',
                    type: 'Number',
                    label: { en: 'To index' },
                },
            ],
        },
    ],
    properties: {
        // ======== DROPZONE CONTENT (wwLayout) ========
        dropzoneContent: {
            hidden: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of elements to display in the dropzone area',
            },
            /* wwEditor:end */
        },

        // ======== INITIAL STATE ========
        initialValue: {
            label: { en: 'Initial value' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of existing items to initialize the component with',
            },
            propertyHelp: {
                tooltip: 'Bind an array of existing items. These will be tracked separately from new uploads.',
            },
            /* wwEditor:end */
        },

        type: {
            label: { en: 'Upload type' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'single', label: { en: 'Single file' } },
                    { value: 'multi', label: { en: 'Multiple files' } },
                ],
            },
            section: 'settings',
            defaultValue: 'single',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['single', 'multi'],
                tooltip: 'A string that defines the upload type: `"single" | "multi"`',
            },
            /* wwEditor:end */
        },
        drop: {
            label: { en: 'Allow drag & drop' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if drag and drop is enabled: `true | false`',
            },
            /* wwEditor:end */
        },
        reorder: {
            label: { en: 'Allow reorder' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            hidden: content => content.type !== 'multi',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if files can be reordered: `true | false`',
            },
            /* wwEditor:end */
        },
        maxFileSize: {
            label: { en: 'Max file size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 10,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum allowed file size in MB: `10`',
            },
            /* wwEditor:end */
        },
        minFileSize: {
            label: { en: 'Min file size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 0,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the minimum allowed file size in MB: `0`',
            },
            /* wwEditor:end */
        },
        maxTotalFileSize: {
            label: { en: 'Max total size (MB)' },
            type: 'Number',
            options: { min: 0 },
            section: 'settings',
            defaultValue: 50,
            hidden: content => content.type !== 'multi',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum total file size in MB: `50`',
            },
            /* wwEditor:end */
        },
        maxFiles: {
            label: { en: 'Max number of files' },
            type: 'Number',
            options: { min: 1 },
            section: 'settings',
            defaultValue: 10,
            hidden: content => content.type !== 'multi',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'A number that defines the maximum number of files allowed: `10`',
            },
            /* wwEditor:end */
        },
        required: {
            label: { en: 'Required' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the upload is required: `true | false`',
            },
            /* wwEditor:end */
        },
        readonly: {
            label: { en: 'Read only' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            hidden: (content, sidePanelContent, boundProps, wwProps) => !!(wwProps && wwProps.readonly !== undefined),
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if the upload is in readonly mode: `true | false`',
            },
            /* wwEditor:end */
        },
        extensions: {
            label: { en: 'Allowed file types' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'any', label: { en: 'Any' } },
                    { value: 'image', label: { en: 'Image' } },
                    { value: 'video', label: { en: 'Video' } },
                    { value: 'audio', label: { en: 'Audio' } },
                    { value: 'pdf', label: { en: 'PDF' } },
                    { value: 'csv', label: { en: 'CSV' } },
                    { value: 'excel', label: { en: 'Excel' } },
                    { value: 'word', label: { en: 'Word' } },
                    { value: 'json', label: { en: 'JSON' } },
                    { value: 'custom', label: { en: 'Custom' } },
                ],
            },
            section: 'settings',
            defaultValue: 'any',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A string that defines the allowed file types: `"any" | "image" | "video" | "custom"`',
            },
            /* wwEditor:end */
        },
        customExtensions: {
            type: 'Text',
            options: { placeholder: '.html, .xml, .pt' },
            section: 'settings',
            hidden: content => content.extensions !== 'custom',
            defaultValue: '',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'A comma-separated list of allowed file extensions: `".html, .xml, .pt"`',
            },
            /* wwEditor:end */
        },
        exposeBase64: {
            label: { en: 'Expose as Base64' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if files should be exposed as Base64: `true | false`',
            },
            propertyHelp: {
                tooltip:
                    "Base64 strings can be very large, so we crop them when displayed in the editor interface. Don't worry, the variable contains the full value when it is used.",
            },
            /* wwEditor:end */
        },
        exposeBinary: {
            label: { en: 'Expose as Binary' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: false,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'A boolean that defines if files should be exposed as Binary: `true | false`',
            },
            propertyHelp: {
                tooltip:
                    'Binary data is a special object that can be very large in size. It will appear as an empty object in the editor interface. To inspect it, you can log it to the console.',
            },
            /* wwEditor:end */
        },

        // ======== ERROR MESSAGE PROPERTIES ========
        errorMsgMultipleFiles: {
            label: { en: 'Multiple files in single mode' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Multiple files provided in single file mode' },
            defaultValue: 'Multiple files provided in single file mode',
            bindable: true,
            hidden: content => content.type !== 'single',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when multiple files are dropped in single file mode',
            },
            /* wwEditor:end */
        },
        errorMsgMaxFilesReached: {
            label: { en: 'Max files reached' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Maximum number of files ({max}) reached' },
            defaultValue: 'Maximum number of files ({max}) reached',
            bindable: true,
            hidden: content => content.type !== 'multi',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when max files limit is reached. Use {max} for the limit value.',
            },
            /* wwEditor:end */
        },
        errorMsgTooManyFiles: {
            label: { en: 'Too many files' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Only {available} more file(s) can be added' },
            defaultValue: 'Only {available} more file(s) can be added',
            bindable: true,
            hidden: content => content.type !== 'multi',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when too many files are selected. Use {available} for remaining slots.',
            },
            /* wwEditor:end */
        },
        errorMsgFileTooSmall: {
            label: { en: 'File too small' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'File size ({size} MB) is below minimum ({min} MB)' },
            defaultValue: 'File size ({size} MB) is below minimum ({min} MB)',
            bindable: true,
            hidden: content => !content.minFileSize || content.minFileSize <= 0,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when file is too small. Use {size} for file size, {min} for minimum.',
            },
            /* wwEditor:end */
        },
        errorMsgFileTooLarge: {
            label: { en: 'File too large' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'File size ({size} MB) exceeds maximum ({max} MB)' },
            defaultValue: 'File size ({size} MB) exceeds maximum ({max} MB)',
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when file is too large. Use {size} for file size, {max} for maximum.',
            },
            /* wwEditor:end */
        },
        errorMsgTotalSizeExceeded: {
            label: { en: 'Total size exceeded' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'Total size ({total} MB) exceeds maximum ({max} MB)' },
            defaultValue: 'Total size ({total} MB) exceeds maximum ({max} MB)',
            bindable: true,
            hidden: content => content.type !== 'multi',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message when total size exceeds limit. Use {total} for total size, {max} for maximum.',
            },
            /* wwEditor:end */
        },
        errorMsgInvalidType: {
            label: { en: 'Invalid file type' },
            type: 'Text',
            section: 'settings',
            options: { placeholder: 'File type "{type}" is not allowed. Accepted: {allowed}' },
            defaultValue: 'File type "{type}" is not allowed. Accepted: {allowed}',
            bindable: true,
            hidden: content => content.extensions === 'any',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Error message for invalid file type. Use {type} for file type, {allowed} for accepted types.',
            },
            /* wwEditor:end */
        },

        // FORM PROPERTIES: Mainly used in the sidepanel for UX purposes
        /* wwEditor:start */
        parentSelection: {
            editorOnly: true,
            defaultValue: false,
        },
        /* wwEditor:end */
        /* wwEditor:start */
        form: {
            editorOnly: true,
            hidden: true,
            defaultValue: false,
        },
        formInfobox: {
            type: 'InfoBox',
            section: 'settings',
            options: (_, sidePanelContent) => ({
                variant: sidePanelContent.form?.name ? 'success' : 'warning',
                icon: 'pencil',
                title: sidePanelContent.form?.name || 'Unnamed form',
                content: !sidePanelContent.form?.name && 'Give your form a meaningful name.',
            }),
            hidden: (_, sidePanelContent) => !sidePanelContent.form?.uid,
        },
        /* wwEditor:end */
        fieldName: {
            label: 'Field name',
            section: 'settings',
            type: 'Text',
            defaultValue: '',
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
        },
        customValidation: {
            label: 'Custom validation',
            section: 'settings',
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
            hidden: (_, sidePanelContent) => {
                return !sidePanelContent.form?.uid;
            },
        },
        validation: {
            label: 'Validation',
            section: 'settings',
            type: 'Formula',
            defaultValue: '',
            bindable: false,
            hidden: (content, sidePanelContent) => {
                return !sidePanelContent.form?.uid || !content.customValidation;
            },
        },
    },
};
