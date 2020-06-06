$( ()=>{
    const targetUrl="https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/master/data/data.json";
    $.ajax({
        url : targetUrl,
         
    }).done((data)=>{
            parseData(JSON.parse(data));
    })
$('.navbar-nav>li>div>a , .dropdown-item>a').on('click', function(){
        console.log(this.text);
});
})

function parseData( json ){
        console.log(json);
        $("#lastUpdate").append(json.lastUpdate);
        console.log(json.lastUpdate);
        let dateArray = [];
        let countArray = [];
        for( const data of json.patients_summary.data){
                logMessage(JSON.stringify(data));
                dateArray.push(data["日付"])
                countArray.push( data["小計"])
        }

        const ctx = $("#myBarChart");
        const myBarChart = new Chart( ctx ,{
                    type:"bar",
                data:{
      labels: dateArray,
      datasets: [
        {
          label: '感染者数',
          data: countArray,
          backgroundColor: "rgba(219,39,91,0.5)"
        }
      ]
                },
                options:{
                    title:{display:true , text:"感染者数遷移"}
                }

        });
}

function logMessage( msg )
{
        $("#log").val( $("#log").val() +"\n"+ msg )
}


