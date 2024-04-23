var map = [];
var finalMap = [];
var nodes = [];
var goal = [];
var finalGoal =[];
var walls = [];
var start = 60;
function generateMap(size){
    size*=2;
    let count = 0;
    for(let i=0;i<size/2;i++){
        map[i] = [];
        for(let j=0;j<size;j++){
            map[i][j] = [];
            if ((i%2==0 && j%2==1)||(i%2==1 && j%2==0)){
                continue;
            }

            if(i==0 || i==10 || j==1 || j==0 || j==21 || j==20){
                goal.push(`${i},${j}`);
            }
            // up-left
            if(i-1>=0 && j-1>=0){
                map[i][j].push(`${i-1},${j-1}`);
            }
            // left
            if(j-2>=0){
                map[i][j].push(`${i},${j-2}`);
            }
            // down-left
            if(i+1<=10 && j-1>=0){
                map[i][j].push(`${i+1},${j-1}`);
            }
            // down-right
            if(i+1<=10 && j+1<=21){
                map[i][j].push(`${i+1},${j+1}`);
            }
            // right
            if(j+2<=21){
                map[i][j].push(`${i},${j+2}`);
            }
            // up-right
            if(i-1>=0 && j+1<=21){
                map[i][j].push(`${i-1},${j+1}`);
            }
        }
    }
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[i].length;j++){
            if(map[i][j].length != 0){
                nodes.push(`${i},${j}`);
            }
        }
    }
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[i].length;j++){
            let templist =[];
            if(map[i][j].length != 0){
                map[i][j].forEach(function(node){
                    let id = nodes.findIndex(function(index){return index == node})
                    templist.push(id);
                });
                finalMap.push(templist);
            }
        }
    }
    
    goal.forEach(function(node){
        let id = nodes.findIndex(function(index){return index == node})
        finalGoal.push(id);
    });

    console.log("MAPA");
    console.log(finalMap);

    var wallsNum = Math.floor(Math.random() * (12 - 8 + 1)) + 14;
    for(let i=0;i<wallsNum;i++){
        do {
            var wall = Math.floor(Math.random() * 121) + 1;
        } while (walls.includes(nodes[wall]) || nodes[wall]  == '5,11')
        walls.push(wall);
    }
    console.log(walls);
    console.log("nodes");
    console.log(nodes);
}
function renderView(){
    const hexGrid = document.getElementById('hexGrid');

    for (let i = 0; i < 121; i++) {

        const button = document.createElement('button');
        let div;

        if (0 <= i && i <= 10) {
            div = document.getElementsByClassName('hex1')[0];
            div.appendChild(button);
        } else if (11 <= i && i <= 21) {
            div = document.getElementsByClassName('hex2')[0];
            div.classList.add('shiftHex');
            div.appendChild(button);
        } else if (22 <= i && i <= 32) {
            div = document.getElementsByClassName('hex3')[0];
            div.appendChild(button);
        } else if (33 <= i && i <= 43) {
            div = document.getElementsByClassName('hex4')[0];
            div.classList.add('shiftHex');
            div.appendChild(button);
        } else if (44 <= i && i <= 54) {
            div = document.getElementsByClassName('hex5')[0];
            div.appendChild(button);
        } else if (55 <= i && i <= 65) {
            div = document.getElementsByClassName('hex6')[0];
            div.classList.add('shiftHex');
            div.appendChild(button);
        } else if (66 <= i && i <= 76) {
            div = document.getElementsByClassName('hex7')[0];
            div.appendChild(button);
        } else if (77 <= i && i <= 87) {
            div = document.getElementsByClassName('hex8')[0];
            div.classList.add('shiftHex');
            div.appendChild(button);
        } else if (88 <= i && i <= 98) {
            div = document.getElementsByClassName('hex9')[0];
            div.appendChild(button);
        } else if (99 <= i && i <= 109) {
            div = document.getElementsByClassName('hex10')[0];
            div.classList.add('shiftHex');
            div.appendChild(button);
        } else if (110 <= i && i <= 120) {
            div = document.getElementsByClassName('hex11')[0];
            div.appendChild(button);
        }
        button.classList.add('hex');
        button.classList.add('hexagon');
        button.id = i;
        if (walls.includes(i)){
            button.style.backgroundColor = "#fc8c03";
        }
        if(i== 60){
            button.style.backgroundColor = "black";
        }
    }
    console.log(map);
    console.log(finalGoal);
    
}
function addToParent(key, value) {
    if (Array.isArray(parent[key])) {
        parent[key].push(value);
    } else {
        parent[key] = [value];
    }
}


function searchPath() {
    console.log("000000000000000000000");

    let queue = [];
    let answer = [];
    for (let i = 0; i < finalGoal.length; i++) {
        answer.push(10 ** 8);
    }
    let visited = {};
    var parent = {};
    for (let node in finalMap) {
        parent[node] = [];
    }
    let finalPath = [];
    let templength = 10**8;
    parent[start] = [];

    queue.push([0, start]);
    console.log("start");
    console.log(start);
    let count = 0;
    while (queue.length > 0) {
        queue.sort();
        let p = queue.find(function(p){
            if (finalGoal.includes(p[1])){
                return p;
            }else{ return queue[0];}
        });

        queue.splice(0, 1);

        p[0] *= -1;

        if (finalGoal.includes(p[1]) && !walls.includes(p[1])) {
            var path = [];
            
            while (p[1] !== start) {
                path.unshift(p[1]);
                p[1] = parent[p[1]][0];
            }
            path.unshift(start);
            if(path.length < templength){
                finalPath = path;
                templength = path.length;
                console.log("Updated shortest path:", finalPath);
            }
            

            
        }

        if (!visited[p[1]] && !walls.includes(p[1])) {
            for (let i = 0; i < finalMap[p[1]].length; i++) {
                if(visited[finalMap[p[1]][i]]==undefined && !walls.includes(finalMap[p[1]][i])){
                    queue.push([(p[0] + 1) * -1,finalMap[p[1]][i]]);
                    parent[finalMap[p[1]][i]].push(p[1]);
                }
            }
        }
        visited[p[1]] = true;
    }
    
    if(finalPath.length != 0){
        console.log("FINALNO RESENJE");
        console.log(finalPath);
        const button = document.getElementById(start);
        button.style.backgroundColor = "#ffcc00";
        const newButton = document.getElementById(finalPath[1]);
        newButton.style.backgroundColor = "black";
        start = finalPath[1];
        console.log("start");
        console.log(start);
        finalPath = [];
        return finalPath;
    }
    console.log("nema izlaza");
    const div = document.getElementById("hexGrid");
    div.innerHTML = "<h1>You Win!</h1>";
    setTimeout(function() {
        location.reload();;
    }, 2000);
    return answer;
}

