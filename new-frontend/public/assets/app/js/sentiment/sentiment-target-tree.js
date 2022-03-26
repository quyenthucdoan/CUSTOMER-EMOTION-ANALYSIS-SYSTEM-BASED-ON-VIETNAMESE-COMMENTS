var loadTargetTrees = function () {
    $('#m_targets_tree').jstree({
        'plugins': ["wholerow","types"],
        'core': {
            "themes" : {
                "responsive": false
            },    
            'data': [{
                    "text": "All Targets",
                    "children": [{
                        "text": "initially selected",
                        "state": {
                            "selected": true
                        }
                    }, {
                        "text": "custom icon",
                        "icon": "fa fa-warning m--font-danger"
                    }, {
                        "text": "initially open",
                        "icon" : "fa fa-folder m--font-default",
                        "state": {
                            "opened": true
                        },
                        "children": ["Another node"]
                    }, {
                        "text": "custom icon",
                        "icon": "fa fa-warning m--font-waring"
                    }, {
                        "text": "disabled node",
                        "icon": "fa fa-check m--font-success",
                        "state": {
                            "disabled": true
                        }
                    }]
                },
                "And wholerow selection"
            ]
        },
        "types" : {
            "default" : {
                "icon" : "fa fa-folder m--font-warning"
            },
            "file" : {
                "icon" : "fa fa-file  m--font-warning"
            }
        },
    });
};

$('#m_targets_tree').on("select_node.jstree", function (e, data) { alert("node_id: " + data.node.id); });

