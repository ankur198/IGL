let Authorization = ''


function CheckAuth()
{
    const auth = getCookie('Auth')

    var req = new XMLHttpRequest()
    req.onreadystatechange = function(){
        if(this.status==401)
        {
            //alert("Invalid credentials")
            window.location = './login.html'
        }
    }
    req.open('GET','./api/date')
    console.log(auth)
    Authorization = "Basic "+auth
    req.setRequestHeader("Authorization",Authorization)
    req.send()
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}