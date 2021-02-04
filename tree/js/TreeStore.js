Ext.define('MyStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.files',
    rootData: {
        text: 'root',
        expanded: true,
        children: [
            {
                text: 'app',
                children: [
                    { leaf: true, text: 'Application.js' }
                ]
            },
            {
                text: 'button',
                expanded: true,
                children: [
                    { leaf: true, text: 'Button.js' },
                    { leaf: true, text: 'Cycle.js' },
                    { leaf: true, text: 'Split.js' }
                ]
            },
            {
                text: 'container',
                children: [
                    { leaf: true, text: 'ButtonGroup.js' },
                    { leaf: true, text: 'Container.js' },
                    { leaf: true, text: 'Viewport.js' }
                ]
            },
            {
                text: 'core',
                children: [
                    {
                        text: 'dom',
                        children: [
                            { leaf: true, text: 'Element.form.js' },
                            { leaf: true, text: 'Element.static-more.js' }
                        ]
                    }
                ]
            },
            {
                text: 'dd',
                children: [
                    { leaf: true, text: 'DD.js' },
                    { leaf: true, text: 'DDProxy.js' },
                    { leaf: true, text: 'DDTarget.js' },
                    { leaf: true, text: 'DragDrop.js' },
                    { leaf: true, text: 'DragDropManager.js' },
                    { leaf: true, text: 'DragSource.js' },
                    { leaf: true, text: 'DragTracker.js' },
                    { leaf: true, text: 'DragZone.js' },
                    { leaf: true, text: 'DragTarget.js' },
                    { leaf: true, text: 'DragZone.js' },
                    { leaf: true, text: 'Registry.js' },
                    { leaf: true, text: 'ScrollManager.js' },
                    { leaf: true, text: 'StatusProxy.js' }
                ]
            },
            {
                text: 'core',
                children: [
                    { leaf: true, text: 'Element.alignment.js' },
                    { leaf: true, text: 'Element.anim.js' },
                    { leaf: true, text: 'Element.dd.js' },
                    { leaf: true, text: 'Element.fx.js' },
                    { leaf: true, text: 'Element.js' },
                    { leaf: true, text: 'Element.position.js' },
                    { leaf: true, text: 'Element.scroll.js' },
                    { leaf: true, text: 'Element.style.js' },
                    { leaf: true, text: 'Element.traversal.js' },
                    { leaf: true, text: 'Helper.js' },
                    { leaf: true, text: 'Query.js' }
                ]
            },
            { leaf: true, text: 'Action.js' },
            { leaf: true, text: 'Component.js' },
            { leaf: true, text: 'Editor.js' }

        ]
    },

    constructor: function (config) {
        // Since records claim the data object given to them, clone the data
        // for each instance.
        config = Ext.apply({
            root: Ext.clone(this.rootData)
        }, config);

        this.callParent([config]);
    }
});