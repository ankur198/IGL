const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db");

const getAllRequest = () => {
    return new Promise(resolve => {
        db.all("SELECT * FROM Request", (err, rows) => {
            //console.log(rows)
            if (rows != undefined) {
                resolve(rows);
            } else resolve([]);
        });
    });
};

const getSearchedRequest = queryTerms => {
    return new Promise(resolve => {
        let query = `SELECT * FROM Request WHERE Date >= datetime('${queryTerms.fromDate} 00:00:00') AND Date <= datetime('${queryTerms.toDate} 23:59:59')`;
        if(queryTerms.location!=''){
            query+=` AND Location = '${queryTerms.location}'`
        }
        if(queryTerms.status!=''){
            query+=` AND Status = '${queryTerms.status}'`
        }
        console.log(query)
        db.all(query, (err, rows) => {
            //console.log(rows)
            if (rows != undefined) {
                resolve(rows);
            } else resolve([]);
        });
    });
};

const getAllLocations = () => {
    return new Promise(resolve => {
        db.all(
            "SELECT Location FROM Request GROUP by Location",
            (err, rows) => {
                //console.log(rows)
                if (rows != undefined) {
                    const loc = [];
                    rows.forEach(element => {
                        loc.push(element.Location);
                    });
                    resolve(loc);
                } else resolve([]);
            }
        );
    });
};

const updateRequestStatus = (Status, RefId) => {
    return new Promise(resolve => {
        db.serialize(() => {
            db.run(
                `UPDATE Request SET Status='${Status}' WHERE RefId=${RefId}`,
                () => resolve()
            );
        });
    });
};

module.exports = { getAllRequest,getSearchedRequest, updateRequestStatus, getAllLocations: getAllLocations };
// getAllRequest()
