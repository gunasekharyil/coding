Ext.define('MyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mycontroller',

    onItemSelected: function (sender, record) {
        Ext.Msg.alert(record.get('name'), '' + record.get('id'));
    }
});

Ext.create('Ext.container.Viewport', {
    items: {
        xtype: 'myview'
    }
});