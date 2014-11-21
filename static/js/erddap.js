function getDatasets(data) {
    var columnHeaders = {};
    for(var i = 0; i < data.table.columnNames.length; i++) {
        columnHeaders[ data.table.columnNames[i] ] = i;
    }

    var datasets = {}
    for(var i = 0; i < data.table.rows.length; i++) {
        var row = data.table.rows[i];
        var record = {};
        for(var key in columnHeaders) {
            record[key] = row[ columnHeaders[key] ];
        }
        datasets[ record["Dataset ID"] ] = record;
    }
    console.log(datasets);
    return datasets;
}

function getParameters(data) {
    var columnHeaders = {};
    for(var i = 0; i < data.table.columnNames.length; i++) {
        columnHeaders[ data.table.columnNames[i] ] = i;
    }

    var parameters = {}
    for(var i = 0; i < data.table.rows.length; i++) {
        var row = data.table.rows[i];
        var record = {};
        for(var key in columnHeaders) {
            record[key] = row[ columnHeaders[key] ];
        }
        record.checked = false;
        parameters[ record["Variable Name"] ] = record;
    }
    console.log(parameters);
    return parameters;
}

function getData(data) {
    var columnHeaders = {};
    for(var i = 0; i < data.table.columnNames.length; i++) {
        columnHeaders[ data.table.columnNames[i] ] = i;
    }

    var variableData = {};
    for(var i = 0; i < data.table.rows.length; i++) {
        var row = data.table.rows[i];
        if(i==0) {
            for(var key in columnHeaders) {
                variableData[key] = [];
            }
        }
        for(var key in columnHeaders) {
            variableData[key].push(row[columnHeaders[key]]);
        }
    }
    return variableData;
}
