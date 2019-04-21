
var db = firebase.firestore();
var ref = db.collection('Data');


function addData(){

    var name = document.getElementById("text").value;
    var email = document.getElementById("email").value;
    ref.add({
            name : name,
            email : email
        });

}

function createElements (Data) {

    console.log(Data);

    var table = document.createElement("table");
    var rw = document.createElement("tr");
    var tdis1 = document.createElement("td");
    var tdis2 = document.createElement("td");
    var dele = document.createElement("input");
    tdis1.setAttribute("width" , "100");
    tdis2.setAttribute("width" , "100");
    dele.setAttribute("value", 'Delete');
    dele.setAttribute("type", 'button');
    rw.setAttribute("height", '30');
    tdis1.innerText = Data.name;
    tdis2.innerText = Data.email;
    table.appendChild(rw);
    rw.appendChild(tdis1);
    rw.appendChild(tdis2);
    rw.appendChild(dele);
    document.body.appendChild(table);

    dele.onclick = function () {

        var did = Data.id;
        ref.doc(did).delete();
        table.removeChild(rw);

    }



}

function removeData (){
   return dele.onclick();

}


function loadData(){

    ref.get().then(function(docs){
        docs.forEach(function(doc){
            var d = doc.data();
            d.id = doc.id;
            createElements(d);

        })
    })


    ref.onSnapshot(function(docs){
        docs.docChanges().forEach(function(document){
            var d = document.doc.data();
            d.id = document.doc.id;

            if (document.type == "added"){
                createElements(d);
            }
            else if (document.type == "removed"){
                removeData(d)

            }


        })
    })
}

loadData();