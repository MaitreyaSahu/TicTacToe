(function () {
    function runGame() {
        var gameArr = Array(9).fill(0);
        var isCrossTurn = true;
        var isGameOver = false;

        //reset grid colors
        console.log(document.querySelectorAll('.crossed'));
        document.querySelectorAll('.crossed').forEach(elem => elem.classList.remove('crossed'));
        document.querySelectorAll('.circled').forEach(elem => elem.classList.remove('circled'));

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
                console.log(gameArr[index].classList.add(isCrossTurn ? 'crossed' : 'circled'));
                isCrossTurn = !isCrossTurn;
                checkResult();
            }
        }

        function checkResult() {
            var gameArrElm = gameArr.map(elem => elem.querySelector(".circle, .cross") ? elem.querySelector(".circle, .cross").className : null);
            //console.log(gameArrElm);

            if ([gameArrElm[0], gameArrElm[1], gameArrElm[2]].every(elem => gameArrElm[0] == elem && elem != null) || //1st row
                [gameArrElm[3], gameArrElm[4], gameArrElm[5]].every(elem => gameArrElm[3] == elem && elem != null) || //2nd row
                [gameArrElm[6], gameArrElm[7], gameArrElm[8]].every(elem => gameArrElm[6] == elem && elem != null) || //3rd row

                [gameArrElm[0], gameArrElm[3], gameArrElm[6]].every(elem => gameArrElm[0] == elem && elem != null) || //1st column
                [gameArrElm[1], gameArrElm[4], gameArrElm[7]].every(elem => gameArrElm[1] == elem && elem != null) || //2nd column
                [gameArrElm[2], gameArrElm[5], gameArrElm[8]].every(elem => gameArrElm[2] == elem && elem != null) || //3rd column

                [gameArrElm[0], gameArrElm[4], gameArrElm[8]].every(elem => gameArrElm[0] == elem && elem != null) || //left to right
                [gameArrElm[2], gameArrElm[4], gameArrElm[6]].every(elem => gameArrElm[2] == elem && elem != null) //right to left
            ) {
                console.log("yeah");
                //runGame();
                //document.querySelectorAll(".circle, .cross").cle
                //alert("yeah");
                resetBtn.style.visibility = "visible";
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
            tiles.forEach(elem => elem.querySelector(".circle, .cross") ? elem.querySelector(".circle, .cross").parentNode.removeChild(elem.querySelector(".circle, .cross")) : "");
            runGame();
        }
    }

    runGame();


})();