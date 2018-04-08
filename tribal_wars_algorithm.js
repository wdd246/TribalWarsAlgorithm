/*
Algorytm budowy wioski z naciskiem na szlachcica oraz podboju świata
Świat prędkość x1
Bez bonusów oraz inncyh funkcji premium
Każda wioska jest oddalona o 3 kratki oraz jest rozbudowana do poziomu wioski startowej bez surowców
Zaczynamy w samym środku
Lvl eko = 30
Lvl koszar = 20
Lvl stajni 10
Lvl muru 20
Lvl zagorody 30 = 24000 populacji
Lvl spichlerza 30 = 400000
1 moneta = 28000/30000/25000
1 szlachcic = 40000/50000/50000
Stosunek wiosek z szlachtą 1:9 => 0.11%
W kwadracie 9x9 jest jedna wioska z szlachcicem 9x=1 => x=1/9 => x=0.11
*/
    
var czas_pierwszej_wioski = 672; //godziny do pałacu z powyższymi poziomami
var zagroda = 24000; 
var spichlerz = 4000000;
var produkcja = 2400; //na godzine
var surowce_szlachcic = 50000;
var surowce_moneta = 30000;
var czas_produkcji_szlachcica = 3; //godziny
var prędkość_szlachcica = 0.58; //godziy = 35 minut na 1 pole
var pole = 3;// ilośc pól do podboju wioski

var świat = 12500; //ilośc wiosek na świecie 
// 100x100

var x=0; //ilość wyprodukowanych szlachciców
var czas=0; // całkowity czas podboju świata

var liczba_wiosek = 1;
// f(j)=(2*(j^2))-(2*j)+1
// (2*(liczba_wiosek^2))-(2*liczba_wiosek)+1
// rosnąca funkcja kwadratowa
// 1,5,13,25,41,61,85...

var ilość_monet_na_karete = 0;
// ((x+4((x+4)+1))/2)-((x(x+1))/2) = ((x^2+9*x+20)/2) - ((x^2+x)/2) = (x^2+9*x+20-x^2-x)/2 = (8*x+20)/2 = |4*x+10|
// funcja rosnąca liniowo z wartością bezwzględną
// suma szeregu 
// (4*x+10)' = 4 
// pochodna wynosi 4

var populacja_budowa_wioski = 2648;
var populacja_wojska = 20652;
var populacja_dla_szlachcica= zagroda-(populacja_wojska+populacja_budowa_wioski); 

var ilość_szlaciców_w_wiosce = populacja_dla_szlachcica/100;  //7 szlachciców
var ilość_karet_w_wiosce = populacja_dla_szlachcica/400; //1 kareta
// jedną wioską można podbić 4 wioski 
// 7-4=3 => bez karety

var surowce_następny_szlachcic = 0;
var czas_następny_szlachcic = 0; //godzin
// funkcja liniowa z wartością bezwzględną
// czas_następny_szlachcic(y+1) - czas_następny_szlachcic(y+2) = |12.5| 
// y = 12.5

var liczba_podbić=0;
// f(g)=g+4
// liczba_ppodbić+=4
// rosnąca funkcja liniowa
// 0,4,8,12,16,20,24,...,n-4,n

while(świat>1){
    
var ilość_monet = Math.abs(((x+4)*(x+5))/2);
// suma ciągu arytmetycznego x*(x+1)/2
// funkcja rosnąca kwadratowo z wartością bezwzględną
// min -5.0
// (0,10)
// (((x+4)*(x+5))/2)' = x+(9/2)
// pochodna wynosi = x+(9/2)

ilość_monet_na_karete += Math.abs(4*x+10);

var surowce_kareta_szlachciców = (surowce_moneta*ilość_monet_na_karete)+(4*surowce_szlachcic);
var czas_kareta_szlachciców = (surowce_kareta_szlachciców/produkcja)+(4*czas_produkcji_szlachcica); //godzin
// funkcja liniowa
// czas_kareta_szlachiców(h) - czas_kareta_szlachiców(h+4) = |200|
// h = 200
// h/4 = 50

surowce_następny_szlachcic = ((x+1)*surowce_moneta)+surowce_szlachcic;
czas_następny_szlachcic = (surowce_następny_szlachcic/produkcja)+czas_produkcji_szlachcica; //godzin
// funkcja liniowa z wartością bezwzględną
// czas_następny_szlachcic(y+1) - czas_następny_szlachcic(y+2) = |12.5| 
// y = 12.5

var czas_podbijanie_z_pierwszej_wioski = czas_kareta_szlachciców+(3*czas_następny_szlachcic)+(4*(2*(pole*prędkość_szlachcica)));
var czas_podbijanie_z_kolejnych_wiosek = czas_kareta_szlachciców+czas_następny_szlachcic+2*(2*(pole*prędkość_szlachcica));


liczba_wiosek+=(2*(Math.pow(liczba_wiosek,2)))-(2*liczba_wiosek)+1;
świat-=liczba_wiosek;
    
czas+=(czas_podbijanie_z_pierwszej_wioski+czas_podbijanie_z_kolejnych_wiosek)/liczba_wiosek;
czas+=liczba_wiosek;
    
x++;
}

czas+=czas_pierwszej_wioski;

console.log(czas);
console.log(czas/24);
console.log((czas/24)/365);