let d1=[ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
[ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
[ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
[ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
[ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
[ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
[ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ];
let dataBase=[d1];
let randomNumber=0;
let answer;
let N = 9;
let wrongattempt=0;
let hintCounter=4;

function solveSudoku(grid, row, col){
    if (row == N - 1 && col == N)
        return true;
    if (col == N){
        row++;
        col = 0;
    }
    if (grid[row][col] != 0) return solveSudoku(grid, row, col + 1);

    for(let num = 1; num < 10; num++){
        if (isSafe(grid, row, col, num)){
            grid[row][col] = num;
            if (solveSudoku(grid, row, col + 1)) return true;
        }
        grid[row][col] = 0;
    }
    return false;
}

function print(grid){
    for(let i = 0; i < N; i++){
        for(let j=0;j<N;j++){
            let str="#c"+i+j;
            if(grid[i][j]!=0) document.querySelector(str).innerHTML=grid[i][j];
            else document.querySelector(str).innerHTML="";
        }
    }
}
function isSafe(grid, row, col, num){
    for(let x = 0; x <= 8; x++){
        if (grid[row][x] == num){
            return false;
        }
    }
    for(let x = 0; x <= 8; x++){
        if (grid[x][col] == num){
            return false;
        }
    }
    let startRow = row - row % 3;
    let startCol = col - col % 3;
 
    for(let i = 0; i < 3; i++)
    for(let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num)
            return false;

    return true;
}

function start(){
    event.preventDefault();
    // if(confirm("Reveal answers?")){
        let grid = [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
   [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
   [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
   [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
   [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
   [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
   [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
   [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
   [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]

    if (solveSudoku(grid, 0, 0))
        // print(grid);
        answer=grid;
    else
        console.log("SOlution doesnot exist");
    // }
    // else{
    //     console.log("Good job")
    // }
}
document.querySelector("#go").addEventListener("click",reavealIt);
function reavealIt(){
    if(confirm("Reveal All boxes")){
        print(answer);
    }
    else console.log("Good for you!")
}

document.querySelector("#startButton").addEventListener("click",function(){
    let grid = dataBase[randomNumber];
    print(grid);
    start();
})
   
let coll=document.querySelectorAll(".col");
coll.forEach((ele)=>{
    ele.addEventListener("input",()=>{checkIt(ele,randomNumber)})
});

function checkIt(id,randomNumber){
    let strArr=id.getAttribute('id').split("");
    let i=Number(strArr[1]);
    let j=Number(strArr[2]);
    let arr=dataBase[randomNumber];
    
        if(arr[i][j]!=0){
            id.innerHTML=arr[i][j];
        }
        else if(id.innerHTML==""){
            id.style.backgroundColor="white";
        }
        else{
            if(id.innerHTML!=answer[i][j]){
                id.style.backgroundColor="red";
                wrongattempt++;
                if(wrongattempt>=4){
                    let grid = dataBase[randomNumber];
                    print(grid);
                    wrongattempt=0;
                    id.style.backgroundColor="white";
                }
            }
            else{
                id.style.backgroundColor="white";
                
            }
        }   

}

document.querySelector("#hint").addEventListener("click",hintFunction);

function hintFunction(){
    if(answer!=null){
        let grid=dataBase[randomNumber];
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let str="#c"+i+j;
                if(document.querySelector(str).innerHTML=="" && grid[i][j]==0){
                    document.querySelector(str).innerHTML=answer[i][j];
                    hintCounter--;
                    if(hintCounter==0){
                        hintCounter=4;
                        print(grid);
                    }
                    return;
                }
            }
        }
    }
    else console.log("Click on start");
}
let navbarToken=false;
document.querySelector("#scroller").addEventListener("click",navbarOpener)

function navbarOpener(){
    let container=document.querySelector("#navbar");
    if(navbarToken==false){
        container.style.width="250px";
        container.style.backgroundColor="#48c9b0";
        navbarToken=true;
    }
    else{
        container.style.width="0px";
        container.style.backgroundColor="white";
        navbarToken=false;

    }
}










