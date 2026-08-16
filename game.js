let minefieldArray;
let fieldArray;
let sizeX;
let sizeY;
let totalMines;
let mineCount;
let counter;
let arrayFilled;

window.addEventListener("contextmenu", e => e.preventDefault());

function buildMinefield(xCount, yCount, mCount)
{
    document.body.removeChild(document.body.firstElementChild);

    sizeX = xCount;
    sizeY = yCount;
    totalMines = mCount;
    mineCount = mCount;
    counter = 0;
    arrayFilled = 0;

    minefieldArray = [];
    fieldArray = [];

    let column;

    for(let i = 0; i < sizeX; i++)
    {
        column = [];
        
        for(let j = 0;  j < sizeY; j++)
        {
            column.push(0);
        }

        minefieldArray.push(column);
    }

    let section = document.createElement("section");

    buildMineCounter(section);
    buildContainer(section);
    buildMainMenuButton(section);

    document.body.appendChild(section);
}

function fillMinefield(firstX, firstY)
{
    let rndX;
    let rndY;
    let usedArray = [];
    let used;
    let a;
    let b;

    for(let x = 0; x < 3; x++)
    {
        let X = (firstX + x - 1);
        for(let y = 0; y < 3; y++)
        {
            let Y = (firstY + y - 1);
            a = [X, Y];
            usedArray.push(a);        
        }
    }


    for(let i = 0; i < mineCount; i++)
    {
        used = 1;

        while(used == 1)
        {
            used = 0;
            rndX = Math.floor(Math.random() * sizeX);
            rndY = Math.floor(Math.random() * sizeY);

            for(let j = 0; j < usedArray.length; j++)
            {
                if(usedArray[j][0] == rndX && usedArray[j][1] == rndY)
                {
                    used = 1;
                    break;
                }
            }
        }

        a = [rndX, rndY];
        usedArray.push(a);

        minefieldArray[rndX][rndY] = 1;
    }

    let tmpArray = [];
    let row;

    for(let j = 0; j < minefieldArray[0].length; j++)
    { 
        row = [];
        
        for(let i = 0; i < minefieldArray.length; i++)
        {
            let text = 0;

            if(minefieldArray[i][j] == 1)
            {
                text = 'X';
            }
            else
            {
                for(let x = 0; x < 3; x++)
                {
                    for(let y = 0; y < 3; y++)
                    {
                        let indexX = (i + x - 1);
                        let indexY = (j + y - 1);

                        if(indexX >= 0 && indexX < sizeX)
                        {
                            if(indexY >= 0 && indexY < sizeY)
                            {
                                text = text + minefieldArray[indexX][indexY];
                            }
                        }
                    }
                }
            }          
                 
            row.push(text);
        }
        
        tmpArray.push(row);
    }

    minefieldArray = tmpArray;
    arrayFilled = 1;
    
}

function buildStartMenu()
{
    document.body.removeChild(document.body.firstElementChild);

    let section = document.createElement("section");
    let e;

    e = document.createElement("h1");
    e.innerText = "Minesweeper";
    section.appendChild(e);
    
    e = document.createElement("button");
    e.setAttribute("onclick", "buildMinefield(5, 5, 7)");
    e.innerText = "Easy";
    section.appendChild(e);

    e = document.createElement("button");
    e.setAttribute("onclick", "buildMinefield(10, 10, 15)");
    e.innerText = "Medium";
    section.appendChild(e);

    e = document.createElement("button");
    e.setAttribute("onclick", "buildMinefield(20, 20, 30)");
    e.innerText = "Hard";
    section.appendChild(e);

    buildCustomInput(section);

    document.body.appendChild(section);
}

function buildMineCounter(s)
{
    let element;

    element = document.createElement("h2");
    element.innerText = "Mines remaining: ";
    s.appendChild(element);

    element = document.createElement("h2");
    element.setAttribute("id", "mineCounter");
    element.innerText = mineCount;
    s.appendChild(element);
}

function buildContainer(s)
{
    let minefield;
    let minefieldCell;   

    if(sizeX >= sizeY)
    {
        let containterWidth = (window.innerWidth * 0.35);
        minefield = document.createElement("div");
        minefield.setAttribute("class", "container");
        minefield.setAttribute("style", "width: " + containterWidth + "px;  " +
                                    "grid-template-columns: repeat(" + sizeX + ", " + containterWidth/sizeX +"px); " + 
                                    "grid-template-rows: repeat(" + sizeY + ", " + containterWidth/sizeX +"px); " + 
                                    "font-size: "+ containterWidth/sizeX + "px;");

        for(let j = 0; j < minefieldArray[0].length; j++)
        {
            row = [];
            for(let i = 0; i < minefieldArray.length; i++)
            {
                minefieldCell = document.createElement("div");

                minefieldCell.setAttribute("class", "covered");
                minefieldCell.setAttribute("onclick", "checkForMine(this)");
                minefieldCell.setAttribute("oncontextmenu", "flag(this)");
                minefieldCell.setAttribute("x", i);
                minefieldCell.setAttribute("y", j);
                minefieldCell.setAttribute("style", "width: " + containterWidth/sizeX + "px; " + "height: " + containterWidth/sizeX + "px;");
                minefield.appendChild(minefieldCell);
                row.push(minefieldCell);
            }   

            fieldArray.push(row);
        }
    }

    else
    {
        let containerHeight = (window.innerHeight * 0.35);
        minefield = document.createElement("div");
        minefield.setAttribute("class", "container");
        minefield.setAttribute("style", "width: " + containerHeight/sizeY * sizeX + "px;  " +
                                    "grid-template-columns: repeat(" + sizeX + ", " + containerHeight/sizeY +"px); " + 
                                    "grid-template-rows: repeat(" + sizeY + ", " + containerHeight/sizeY +"px); " + 
                                    "font-size: "+ containerHeight/sizeY + "px;");

        for(let j = 0; j < minefieldArray[0].length; j++)
        {
            row = [];
            for(let i = 0; i < minefieldArray.length; i++)
            {
                minefieldCell = document.createElement("div");

                minefieldCell.setAttribute("class", "covered");
                minefieldCell.setAttribute("onclick", "checkForMine(this)");
                minefieldCell.setAttribute("oncontextmenu", "flag(this)");
                minefieldCell.setAttribute("x", i);
                minefieldCell.setAttribute("y", j);
                minefieldCell.setAttribute("style", "width: " + containerHeight/sizeY + "px; " + "height: " + containerHeight/sizeY + "px;");
                minefield.appendChild(minefieldCell);
                row.push(minefieldCell);
            }        
            
            fieldArray.push(row);
        }
    }    

    s.appendChild(minefield);
}

function buildMainMenuButton(s)
{
    let e;
    e = document.createElement("button");
    e.setAttribute("onclick", "buildStartMenu()");
    e.innerText = "Main Menu";
    s.appendChild(e);
}

function buildRestartButton(s)
{
    counter = 0;

    let e;
    e = document.createElement("button");
    e.setAttribute("onclick", "buildMinefield(" + sizeX + ", " + sizeY + ", " + mineCount + ")");
    e.innerText = "Restart";
    s.appendChild(e);
}

function buildWinScreen()
{
    let section = document.createElement("section");
    let e;
    document.body.removeChild(document.body.firstElementChild);
    e = document.createElement("h1");
    e.innerText = "You win!";
    section.appendChild(e);
    buildRestartButton(section);
    document.body.appendChild(section);
}

function buildLossScreen()
{
    let section = document.createElement("section");
    let e;
    document.body.removeChild(document.body.firstElementChild);
    e = document.createElement("h1");
    e.innerText = "You lose!";
    section.appendChild(e);
    buildRestartButton(section);
    document.body.appendChild(section);
}

function buildCustomInput(s)
{
    let form;
    let label;
    let input;
    let div = document.createElement("div");
    div.innerText = "Enter custom field size:"

    form = document.createElement("form");

    form.appendChild(div);

    label = document.createElement("label");
    label.setAttribute("for", "sizeX");
    label.innerText = "Field Width: ";
    input = document.createElement("input");
    input.setAttribute("id", "sizeX");
    input.setAttribute("type", "number");
    input.setAttribute("min", "4");
    input.setAttribute("max", "200");
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);

    label = document.createElement("label");
    label.setAttribute("for", "sizeY");
    label.innerText = "Field Height: ";
    input = document.createElement("input");
    input.setAttribute("id", "sizeY");
    input.setAttribute("type", "number");
    input.setAttribute("min", "4");
    input.setAttribute("max", "200");
    input.required = true;
    form.appendChild(label);
    form.appendChild(input);

    input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.setAttribute("value", "Play");
    form.appendChild(input);

    s.appendChild(form);

    form.addEventListener("submit", function(e) {
    e.preventDefault(); // remove this if you actually want the form to submit

    checkCustomInput();
});
}

function checkCustomInput()
{
    let x = Number(document.getElementById("sizeX").value);
    let y = Number(document.getElementById("sizeY").value);
    let mines = Math.ceil((x * y) * 0.15);

    buildMinefield(x, y, mines);
}

function checkForMine(e)
{
    let x = Number(e.getAttribute("x"));
    let y = Number(e.getAttribute("y"));

    if(arrayFilled == 0)
    {
        fillMinefield(x, y);
    }

    if(minefieldArray[y][x] === 'X')
    {
        buildLossScreen();
        let element = document.body.getElementsByTagName("section");
        buildMainMenuButton(element[0]);

    }
    else
    {
        uncover(e);
    }
}

function uncover(e)
{
    if(e.className === "uncovered" || e.className === "flagged")
    {
        return;
    }

    let x = Number(e.getAttribute("x"));
    let y = Number(e.getAttribute("y"));

    if(minefieldArray[y][x] != 0)
    {
        if(minefieldArray[y][x] != 'X')
        {
            updateField(e, x, y);
        }
        return;
    }

    updateField(e, x, y);

    if(!(x - 1 < 0))
    {
        uncover(fieldArray[y][x - 1]);

        if(!(y - 1 < 0))
        {
            uncover(fieldArray[y - 1][x - 1]);
        }

        if(!(y + 1 >= sizeY))
        {
            uncover(fieldArray[y + 1][x - 1]);
        }    
    }

    if(!(y - 1 < 0))
    {
        uncover(fieldArray[y - 1][x]);
    }

    if(!(x + 1 >= sizeX))
    {
        uncover(fieldArray[y][x + 1]);

        if(!(y - 1 < 0))
        {
            uncover(fieldArray[y - 1][x + 1]);
        }

        if(!(y + 1 >= sizeY))
        {
            uncover(fieldArray[y + 1][x + 1]);
        }   
    }

    if(!(y + 1 >= sizeY))
    {
        uncover(fieldArray[y + 1][x]);
    }    
}

function flag(e)
{
    if(e.className === "flagged")
    {
        e.className = "covered";
        e.setAttribute("onclick", "checkForMine(this)");
        updateMineCounter(1);
    }
    else if(e.className === "covered")
    {
        e.className = "flagged";
        e.removeAttribute("onclick");
        updateMineCounter(-1);
    }

}

function updateMineCounter(num)
{
    let mineCounter = document.getElementById("mineCounter");
    mineCounter.innerText = Number(mineCounter.innerText) + num;
}

function updateField(e, x, y)
{
    if(minefieldArray[y][x] == 0)
    {
        e.innerText = "";
    }
    else
    {
        e.innerText = minefieldArray[y][x];
    }
    e.className = "uncovered";
    e.setAttribute("value", minefieldArray[y][x]);
    e.removeAttribute("onclick");
    e.removeAttribute("oncontextmenu");
    counter++;
    checkForWin();
}

function checkForWin()
{
    if(counter == sizeX * sizeY - totalMines)
    {
        buildWinScreen();
        let element = document.body.getElementsByTagName("section");
        buildMainMenuButton(element[0]);
    }
}
