const http = require('http');

/*const express = require('express');
const app = express();
app.use('/static', express.static('public'));*/

//app.use('/uploads', express.static(`${__dirname}/assets/images`));
//app.use('/styles', express.static(`${__dirname}/css`));

const html =`
    <!DOCTYPE html>
    <html>
        <head>
          <meta charset="utf-8">
            <title>Doc</title>
            <script type = "text/javascript" src="C_code.js"></script>
            <link rel="stylesheet" href="indexCSS.css">
        </head>
            <body style = "background-color: rgb(240, 250, 250)">
                    <div class="section">
                        <div class="section__text">Морской бой</div>
                        <button class="section__button" type="submit" onclick="countRabbits()">Начать новую игру</button><!---->
                    </div>
                    <script type = "text/javascript">
                    mkTbl('50px', 11);
                </script>

        </body>
    </html>
`

const css =`
.section
{
    margin: 3% 5% ;
    width: 100%;
    max-width: 530px;
    
    display: flex;
    justify-content: space-around;
}

.section__text
{
    padding: 10px;
    max-width: 530px;
    
    font-size: 30px;
    font-style: italic;
    color: #999;
}

.section__button
{
    padding: 10px;
    max-width: 530px;
    
    font-size: 20px;    
    color: #333;
    
}
`

const js =`
var mat =
    [
    // y 0  1 2 3 4 5 6 7 8 9 10 11    x
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //0

        [0, 0,0,0,0,0,0,0,0,0,0, 0], //1
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //2
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //3
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //4
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //5
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //6
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //7
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //8
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //9
        [0, 0,0,0,0,0,0,0,0,0,0, 0], //10

        [0, 0,0,0,0,0,0,0,0,0,0, 0], //11
    ];

var kol_Ship=9;
var kol_hit;

var Ship=
    [
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,], 
        [0,0,0,0,]
    ]
//1    4-палубный
//2-3  3-палубный
//4-6  4-палубный
//7-10 4-палубный

tbl = "";
mT = 0;
function mkTbl(tdSz, n) 
{
        mT = n;
        td = "<td style = 'background-color:#fff; width:" + tdSz + "; height:" + tdSz + "'";
        td += " onclick = 'sayRC(this)'></td>";

        tHdr = "<table id = 'tbl' style = 'background-color:#cccffa; cursor:pointer'; border = 1px";

        document.write(tHdr);
        for (i = 0; i < mT; i++) 
        {
            document.write("<tr>");
            for (j = 0; j < mT; j++) 
                document.write(td);
            document.write("</tr>");
        }
        document.write("</table>");
        tbl = document.getElementById("tbl");

        tbl.style.textAlign= 'center';   
        tbl.style.fontSize= '20px';   
        for( var i=0;i<10;i++)
        {
            tbl.rows[0].cells[i+1].innerHTML=i+1;
            tbl.rows[0].cells[i+1].style.backgroundColor = '#95E1D3';
            tbl.rows[i+1].cells[0].style.backgroundColor = '#95E1D3';
        }
        tbl.rows[0].cells[0].style.backgroundColor = '#95E1D3';

        tbl.rows[1].cells[0].innerHTML='A';
        tbl.rows[2].cells[0].innerHTML='B';
        tbl.rows[3].cells[0].innerHTML='C';
        tbl.rows[4].cells[0].innerHTML='D';
        tbl.rows[5].cells[0].innerHTML='E';
        tbl.rows[6].cells[0].innerHTML='F';
        tbl.rows[7].cells[0].innerHTML='G';
        tbl.rows[8].cells[0].innerHTML='H';
        tbl.rows[9].cells[0].innerHTML='I';
        tbl.rows[10].cells[0].innerHTML='J';

        /* Расстановка кораблей */

    //console.log(localStorage.getItem('key_Fl'));   //Какой ключ, на перезагрузку или продолжение игры
        
    if(localStorage.getItem('key_Fl')!='0')
    {
        //Подгрузка данных о положении корабликов        
        var flags=0;
        for(var i=0;i<12;i++) for(var j=0;j<12;j++)
        {
            mat[i][j]=Number((localStorage.getItem('key_Mat'))[flags]);
            flags+=2;
            if(mat[i][j]===4)
                tbl.rows[i].cells[j].style.backgroundColor = '#E14A39';
            if(mat[i][j]===3)
                tbl.rows[i].cells[j].style.backgroundColor = '#E1E154';
            if(mat[i][j]===2)
                tbl.rows[i].cells[j].style.backgroundColor = '#CCCFFA';

        }
        
        flags=0;
        for(var i=0;i<10;i++) for(var j=0;j<4;j++)
        {
            if((localStorage.getItem('key_Ship'))[flags]==="1" && (localStorage.getItem('key_Ship'))[flags+1]==="0")
            {
                Ship[i][j]=Number((localStorage.getItem('key_Ship'))[flags]+(localStorage.getItem('key_Ship'))[flags+1]);
                flags++;
            }
            else
                Ship[i][j]=Number((localStorage.getItem('key_Ship'))[flags]);
            flags+=2;

        }
        
        /*console.log((localStorage.getItem('key_Mat')).length);
        console.log(mat[31]);
        console.log(mat[32]);
        console.log(mat[33]);
        console.log(mat[34]);
        console.log(mat[35]);
        console.log(mat[36]);*/
    }
    else
        randomShip();
    
    //console.log(mat);   //Какая матрица подгрузилась
    
}

/* действие при нажатии на ячейку */
function sayRC(cll) 
{
 // Номер столбца текущей ячейки
c = cll.cellIndex;
r = gtRw(cll, c);

if(c>0 && r>0)
{
    //alert("Ячейка " + r + ":" + c);
    
    if (mat[r][c]===2 || mat[r][c]===4)
    {
        console.log("Повторный выстрел по координатам "+r+" "+c);
    }
    else if(mat[r][c]===1)
    {        
        console.log("Попадание! При выстреле по координатам "+r+" "+c);

        if(mat[r][c]===1) kol_hit++; //считать кол-во попаданий
        
        mat[r][c]=2;
        tbl.rows[r].cells[c].style.backgroundColor = '#CCCFFA'; //попали
        
        for(var i=0;i<10;i++) if(Ship[i][2]===1) //проверка всех кораблей
        {
            
            //alert(Ship[i][1]+"!"+Ship[i][0]);
            var flag=0;
            for(var j=0;j<Ship[i][3];j++) 
            {
                if(mat[Ship[i][0]+j][Ship[i][1]]===1)
                {
                    flag=1;
                    break;
                }
            }
            
            if(flag===0)
            {
                //alert(Ship[i][0]+j+" "+Ship[i][1]);
                
                for(var j1=0;j1<Ship[i][3];j1++) 
                {
                    tbl.rows[Ship[i][0]+j1].cells[Ship[i][1]].style.backgroundColor = '#E14A39';
                    mat[Ship[i][0]+j1][Ship[i][1]]=4;//убито
                }
            }
                                             
        }
        else
        {        

            var flag=0;
            for(var j=0;j<Ship[i][3];j++) 
            {
                if(mat[Ship[i][0]][Ship[i][1]+j]===1)
                {
                    flag=1;
                    break;
                }
            }
            
            if(flag===0)
            {
                //alert(Ship[i][0]+j+" "+Ship[i][1]);
                
                for(var j1=0;j1<Ship[i][3];j1++) 
                {
                    tbl.rows[Ship[i][0]].cells[Ship[i][1]+j1].style.backgroundColor = '#E14A39';
                    mat[Ship[i][0]][Ship[i][1]+j1]=4;//убито
                }
            }
        }
        
        if(mat[r][c]===4)
            console.log("Корабль уничтожено");
        
        if(kol_hit===20)
            /*           //Почему-то не работает!!!!!!!
            if (confirm('Поздравляем, все корабли противника повержены!\nНачать новую игру?')) 
            {
                localStorage.setItem('key_Fl',0);
                console.log(localStorage.getItem('key_Fl'));
                location.reload();
            } */
            alert("Поздравляем, все корабли противника повержены!");
        
    }
    else
    {   if(mat[r][c]===3) 
            console.log("Повторный выстрел по координатам "+r+" "+c);
        else
            console.log("Мимо! Выстрел по координатам "+r+" "+c);
        mat[r][c]=3;
        tbl.rows[r].cells[c].style.backgroundColor = '#E1E154';
    }
}
    
localStorage.setItem('key_Mat',mat);
localStorage.setItem('key_Fl',1);
localStorage.setItem('key_Ship',Ship);
    
//console.log(localStorage.getItem('key_Fl'));
//console.log(mat);  //Что записалось в новый массив
}

// Возвращает номер строки, которой расположена ячейка cll
function gtRw(cll, c) 
{
    for (i = 0; i < mT; i++) 
    {
        rw = tbl.rows[i];
        if (rw.cells[c] == cll) return i;
    }
}



/***************************************/

function randomShip()
{
    kol_hit=0;
    var ShipList=[0,4,3,2,1];
    var x=0,y=0,D=0, //D - направление корабля
    T=4;
    
    while(//короче пока не расставим все кораблики корректно
        
    (ShipList[1]>0)||
    (ShipList[2]>0)||
    (ShipList[3]>0)||
    (ShipList[4]>0))
    {
        if(ShipList[T]==0) T--;//Если расставили все корабли одного класса, переходим к корабликам меньшего класса
        
        x=getRandomInt(1,10);
        y=getRandomInt(1,10);
        D=getRandomInt(0,1);

        //console.log("пробуем поставить в X " + x+" Y "+y+" направление "+ D+ " корабль типа "+T);
        
        /*если функция установит корабль вычитаем количество кораблей из списка*/
        if(Insert_ship(x,y,T,D))
        {
            //уменьшаем количество кораблей в ангаре 
            ShipList[T]--;
        }
    }
}

//Функция добавления кораблика (коорд. Х, коорд. Y, палубность корабля, направление корабля)
function Insert_ship(X,Y,T,D)
{
    //D=1;
    if(D===1)   //вертикально
    {
        if(Y+T>10) //Не должен выходить за поле
            return false;
        
        /*не пересикается с кораблями*/
        var flag=0;
        for(var i=0;i<3;i++) for(var j=0;j<T+2;j++)
        {
            if(mat[Y-1+j][X-1+i]===1)
                return false;//пересеклись с кораблем другим
        }
        
        for(var j=0;j<T;j++)
        {
            mat[Y+j][X]=1;
             
            //для отображения расстановки корабликов
             //tbl.rows[Y+j].cells[X].style.backgroundColor = 'blue';
        }
    }
    else        //горизонтально
    {
        if(X+T>10) //Не должен выходить за поле
            return false;
        
        /*не пересикается с кораблями*/
        for(var i=0;i<3;i++) for(var j=0;j<T+2;j++)
        {
            if(mat[Y-1+i][X-1+j]===1)
                return false;//пересеклись с кораблем другим
        }
        
        for(var j=0;j<T;j++)
        {
            mat[Y][X+j]=1;
            //для отображения расстановки корабликов
             //tbl.rows[Y].cells[X+j].style.backgroundColor = 'blue';
        }
    }
    
    //Вывод позиции утвержденных кораблей
    Ship[kol_Ship][0]=Y;
    Ship[kol_Ship][1]=X;
    Ship[kol_Ship][2]=D;
    Ship[kol_Ship][3]=T;
    //console.log(Ship[kol_Ship]);      //Сведения о корабле
    
    kol_Ship--;
    return true;
}

//Рандомизатор
function getRandomInt(min,max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Обработка нажатия на кнопку
function countRabbits()
{   
    localStorage.setItem('key_Fl',0);
    console.log(localStorage.getItem('key_Fl'));
    location.reload();
}
`

http.createServer((req,res) => {
    console.log(req.url);
    switch(req.url){
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(html);
            
        case '/indexCSS.css':
            res.writeHead(200, { 'Content-Type': 'text/css'});
            res.end(css);
            
        case '/C_code.js':
            res.writeHead(200, { 'Content-Type': 'text/javascript'});
            res.end(js);
            
        default: 
            res.writeHead(404, { 'Content-Type': 'text/plain'});
            res.end('404 No ansver');
    }
}).listen(3000, () => console.log('Server is working'));

