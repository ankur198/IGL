let x = new Vue({
    el: "#app",
    data: {
        requests: [],
        currentRequest: undefined,
        filter: {
            allLocations: [],
            location: "",
            fromDate: "",
            toDate: "",
            status: ""
        }
    },

    methods: {
        getRequests: async function() {
            const isValid = () => {
                return this.filter.fromDate != "" && this.filter.toDate != "";
            };
            if (isValid()) {
                const body = {
                    fromDate: this.filter.fromDate,
                    toDate: this.filter.toDate,
                    status: this.filter.status,
                    location: this.filter.location
                };
                let response;
                await fetch("/api/requests", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                })
                    .then(data => data.json())
                    .then(data => (response = data));
                console.log(response);
                this.requests = response;
                // console.log(this.requests)
            }else{
              alert("From date and to date are mandatory")
            }
        },
        getAllLocations: async function() {
            await fetch("/api/requests/locations")
                .then(data => data.json())
                .then(data => (this.filter.allLocations = data));
            this.filter.allLocations.sort();
        },
        inLocation: function(req) {
            console.log();
            if (
                req.Location.toLowerCase().includes(
                    this.filter.location.toLowerCase()
                )
            )
                return true;
            else return false;
        },
        makeCurrentRequest: function(req) {
            this.currentRequest = JSON.parse(JSON.stringify(req));
        },
        updateStatus: async function() {
            let r = this.requests.filter(this.isSameId)[0];
            r.Status = this.currentRequest.Status;
            await fetch(`/api/requests/${r.RefId}/status/${r.Status}`);
        },
        isSameId: function(req) {
            return req.RefId == this.currentRequest.RefId;
        }
    },
    mounted() {
        this.getAllLocations();
    }
});
