(function () {
    function runGame() {
        var gameArr = Array(9).fill(0);
        var isCrossTurn = true;
        var isGameOver = false;

        //reset grid colors
        console.log(document.querySelectorAll('.crossed'));
        document.querySelectorAll('.crossed').forEach(elem => elem.classList.remove('crossed'));
        document.querySelectorAll('.circled').forEach(elem => elem.classList.remove('circled'));

        const crossedPlayer = document.querySelector('.player1');
        const circledPlayer = document.querySelector('.player2');
        

        var resetBtn = document.getElementById("resetBtn");
        resetBtn.style.visibility = "hidden";
        resetBtn.addEventListener("click", resetGame);


        var tiles = Array.from(document.querySelectorAll(".tiles"));

        //console.log(tiles.length);

        for (var i = 0; i < tiles.length; i++) {
            //console.log(tiles);
            gameArr[i] = tiles[i];

            (function (i) {
                tiles[i].addEventListener("click", () => {
                    markCard(i, tiles[i]);
                });
            })(i);
        }



        function markCard(index, elem) {

            //console.log(index,elem, elem.innerHTML.trim());
            if (elem.innerHTML.trim()) {
                console.log('xxxxxxxxxx');
            } else {
                var mark = isCrossTurn ? getCrossElement("cross") : getCrossElement("circle");
                //console.log(mark);
                //console.log(isCrossTurn);
                gameArr[index].appendChild(mark);
                gameArr[index].classList.add(isCrossTurn ? 'crossed' : 'circled');
                isCrossTurn = !isCrossTurn;
                checkResult();
                console.log(isGameOver, isCrossTurn);
                isGameOver || isCrossTurn ? crossedPlayer.classList.add('active') || circledPlayer.classList.remove('active') : crossedPlayer.classList.remove('active') || circledPlayer.classList.add('active');
            }
        }

        function checkResult() {
            var gameArrElm = gameArr.map(elem => elem.querySelector(".circle, .cross") ? elem.querySelector(".circle, .cross").className : null);
            //console.log(gameArrElm);
            var completedLine  = [];

            if ([gameArrElm[0], gameArrElm[1], gameArrElm[2]].every(elem => gameArrElm[0] == elem && elem != null) && (completedLine = [0, 1, 2]) || //1st row
                [gameArrElm[3], gameArrElm[4], gameArrElm[5]].every(elem => gameArrElm[3] == elem && elem != null) && (completedLine = [3, 4, 5]) || //2nd row
                [gameArrElm[6], gameArrElm[7], gameArrElm[8]].every(elem => gameArrElm[6] == elem && elem != null) && (completedLine = [6, 7, 8]) || //3rd row

                [gameArrElm[0], gameArrElm[3], gameArrElm[6]].every(elem => gameArrElm[0] == elem && elem != null) && (completedLine = [0, 3, 6]) || //1st column
                [gameArrElm[1], gameArrElm[4], gameArrElm[7]].every(elem => gameArrElm[1] == elem && elem != null) && (completedLine = [1, 4, 7]) || //2nd column
                [gameArrElm[2], gameArrElm[5], gameArrElm[8]].every(elem => gameArrElm[2] == elem && elem != null) && (completedLine = [2, 5, 8]) || //3rd column

                [gameArrElm[0], gameArrElm[4], gameArrElm[8]].every(elem => gameArrElm[0] == elem && elem != null) && (completedLine = [0, 4, 8]) || //left to right
                [gameArrElm[2], gameArrElm[4], gameArrElm[6]].every(elem => gameArrElm[2] == elem && elem != null) && (completedLine = [2, 4, 6])//right to left
            ) {
                console.log(completedLine);
                tiles.forEach((tile, index) => completedLine.includes(index) ? "" : tile.classList.add('disabled'));
                //runGame();
                //document.querySelectorAll(".circle, .cross").cle
                //alert("yeah");
                resetBtn.style.visibility = "visible";
                isGameOver = true;
                //location.reload();
                //document.getElementsByClassName("circle").parentNode;
            }
        }

        function getCrossElement(type) {
            var elem = document.createElement("img");
            elem.setAttribute("src", type == "cross" ? "./images/x.svg" : "./images/o.svg");
            elem.className = type;

            return elem;

        }

        function resetGame() {
            tiles.forEach(elem => elem.classList.remove('disabled') || elem.querySelector(".circle, .cross") ? elem.querySelector(".circle, .cross").parentNode.removeChild(elem.querySelector(".circle, .cross")) : "");
            isGameOver = false;
            isCrossTurn ? crossedPlayer.classList.add('active') || circledPlayer.classList.remove('active') : crossedPlayer.classList.remove('active') || circledPlayer.classList.add('active');
            runGame();
        }
    }

    runGame();


})();