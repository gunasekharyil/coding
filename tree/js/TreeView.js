Ext.define('MyView', {
    extend: 'Ext.tree.Panel',
    xtype: 'myview',
    title: 'File System',
    controller: 'mycontroller',
    store: Ext.create('MyStore'),

    autoHeight: true,
    width: 600,
    tools: [{
        type: 'plus',
        tooltip: 'Expand All',
        scope: this,
        callback: function (panel, tool, event) {
            panel.expandAll();
        }
    }, {
        type: 'minus',
        tooltip: 'Collapse All',
        scope: this,
        callback: function (panel, tool, event) {
            panel.collapseAll();
        }
    }],
    columns: [{

        dataIndex: 'text',
        xtype: 'treecolumn',
        flex: 0.1,

    }, {
        xtype: 'actioncolumn',

        renderer: function (value, meta, record) {
            if (record.data.leaf) {
                meta.style = 'visibility: hidden';
            }
        },
        dataIndex: 'rating',
        menuDisabled: true,
        sortable: false,
        items: [{
            iconCls: 'x-fa fa-folder',
            tooltip: 'Create Folder',
            handler: function (grid) {
                var selected = grid.getSelectionModel().getSelection()[0];
                if (!selected.data.leaf) {
                    selected.appendChild({
                        leaf: false,
                        expandable: true,
                        text: "NewFolder",
                        children: [],
                        rating: ""

                    });

                }
            }
        }, {

            iconCls: 'x-fa fa-file-o',
            handler: function (grid) {
                var selected = grid.getSelectionModel().getSelection()[0];
                debugger;
                if (!selected.data.leaf) {
                    selected.appendChild({
                        leaf: true,
                        expandable: false,
                        text: "NewFile.js"

                    });

                }
            }
        }]

    }

    ],

});