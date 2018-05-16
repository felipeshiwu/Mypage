var optativasMaterias=[];
var tg1;
var tg2;
var xml=null;
var numVer="";
var aluno=[];

// Le o XML
function xmlMicoxLoader(url){
    if(window.XMLHttpRequest){
        var Loader = new XMLHttpRequest();
        Loader.open("GET", url ,false);
        Loader.send(null);
        return Loader.responseXML;
    }
    else if(window.ActiveXObject){
        var Loader = new ActiveXObject("Msxml2.DOMDocument.3.0");
        Loader.async = false;
        Loader.load(url);
        return Loader;
    }
}

// Pinta a tabela no HTML
function pintaMateria(materia,cor){
    var str1="#"
    var element=document.getElementById(materia);
    if(element!=null){
        if (cor)
        element.style.background=cor;
    }
}

// Descobre todas as materias do aluno
function achaMateria(aluno){
    var vers;
    var materia;
    var estrutura;
    var status;
    var optativas = [];
    var optativasMat = [];

    ind=1;
    opt=0;
    for(i=0;i<aluno.length;i++){
        materia=aluno[i].childNodes[29].firstChild.nodeValue;
        console.log(aluno[1].childNodes);
        estrutura=aluno[i].childNodes[45].firstChild.nodeValue;
        status=aluno[i].childNodes[27].firstChild.nodeValue;
        if(estrutura=="Obrigatórias"){
            if(status=="Aprovado")
                pintaMateria(materia,"#6aa84f");
            else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
                pintaMateria(materia,"#e06666");
            else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
                pintaMateria(materia,"#f1c232");
            else if(status=="Matrícula")
                pintaMateria(materia,"#0b5394");
            else
                pintaMateria(materia,"gray");
        }
        else if(estrutura=="Optativas"){
            optativas.push(status);
            optativasMat.push(materia);
        }
        else if(estrutura=="Trabalho de Graduação I"){
            if(status=="Aprovado")
                pintaMateria("TGI","#6aa84f");
            else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
                pintaMateria("TGI","#e06666");
            else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
                pintaMateria("TGI","#f1c232");
            else if(status=="Matrícula")
                pintaMateria("TGI","#0b5394");
            tg1=materia;
        }
        else if(estrutura=="Trabalho de Graduação II"){
            if(status=="Aprovado")
                pintaMateria("TGII","#6aa84f");
            else if((status=="Reprovado por nota" || status=="Reprovado por Frequência"))
                pintaMateria("TGII","#e06666");
            else if((status=="Equivalência de Disciplina" || status=="Dispensa de Disciplinas (com nota)"))
                pintaMateria("TGII","#f1c232");
            else if(status=="Matrícula")
                pintaMateria("TGII","#0b5394");
            tg2=materia;
        }

    }
    pintarOptativas(optativas,optativasMat,9);
}

// Procura a linha no XML da materia
function pegarMateria(materia){
    var m=["","","","",""];
    for(i=0;i<aluno.length;i++){
        if(aluno[i].childNodes[29].firstChild.nodeValue==materia){
            m[0]=aluno[i].childNodes[29].firstChild.nodeValue; //codigo
            m[1]=aluno[i].childNodes[31].firstChild.nodeValue; // nome
            m[2]=aluno[i].childNodes[19].firstChild.nodeValue; // ano
            m[3]=aluno[i].childNodes[21].firstChild.nodeValue; // nota
            m[4]=aluno[i].childNodes[47].firstChild.nodeValue; // freq
        }
    }
    return m;
}

// Retorna todas as matriculas de uma unica materia
function historico(materia){
    var materias=[];
    for(i=0;i<aluno.length;i++){
        if(aluno[i].childNodes[29].firstChild.nodeValue==materia){
            materias.push(aluno[i]);
        }
    }
    return materias;
}

// Popup do historico de uma disciplina
function imprimeTela(hist){
    var m = [];
    m.push("Código: "+ hist[0].childNodes[29].firstChild.nodeValue);
    m.push("Materia: "+ hist[0].childNodes[31].firstChild.nodeValue);
    m.push("            ");
    for(i=0;i<hist.length;i++){
            m.push("Ano: "+hist[i].childNodes[19].firstChild.nodeValue); // ano
            m.push("Nota: "+hist[i].childNodes[21].firstChild.nodeValue); // nota
            m.push("Frequência: "+hist[i].childNodes[47].firstChild.nodeValue); // freq
            m.push("            ");
    }
    alert(m.join("\n"));
}

// Popup da ultima vez feita a disciplina
 function mostrarMateria(objeto, e){
    if(e.button == 0){
        if(objeto.innerHTML.indexOf("OPT") > -1){
            var split = objeto.innerHTML.split("OPT");
            var n = parseInt(split[1]);
            materia=pegarMateria(optativasMaterias[n-1]);
            if(materia[0] != "")
                alert("Código: " + materia[0]+"\nNome da disciplina: " + materia[1]+"\nÚltima vez cursado: " + materia[2] +"\nNota: "+materia[3] +"\nFrequência: " + materia[4]);
            else
                alert("Disciplina não feita");
        }
        else if(objeto.innerHTML == "TG II"){
            materia = pegarMateria(tg2);
            if(materia[0] != "")
                alert("Código: " + materia[0]+"\nNome da disciplina: " + materia[1]+"\nÚltima vez cursado: " + materia[2] +"\nNota: "+materia[3] +"\nFrequência: " + materia[4]);
            else
                alert("Disciplina não feita");
        }
        else if(objeto.innerHTML == "TG I"){
            materia = pegarMateria(tg1);
            if(materia[0] != "")
                alert("Código: " + materia[0]+"\nNome da disciplina: " + materia[1]+"\nÚltima vez cursado: " + materia[2] +"\nNota: "+materia[3] +"\nFrequência: " + materia[4]);
            else
                alert("Disciplina não feita");
        }
        else {
            materia = pegarMateria(objeto.innerHTML);
            if(materia[0] != "")
                alert("Código: " + materia[0]+"\nNome da disciplina: " + materia[1]+"\nÚltima vez cursado: " + materia[2] +"\nNota: "+materia[3] +"\nFrequência: " + materia[4]);
            else
                alert("Disciplina não feita");
        }
    }
    else if(e.button == 2){
        var m = [];
        if(objeto.innerHTML.indexOf("OPT") > -1){
            var split = objeto.innerHTML.split("OPT");
            var n = parseInt(split[1]);
            var hist=historico(optativasMaterias[n-1]);
            if(hist.length>0)
                imprimeTela(hist);            
            else
                alert("Disciplina sem histórico disponivel");
        }
        else if(objeto.innerHTML=="TG I"){
            var hist=historico(tg1);
            if(hist.length>0)
                imprimeTela(hist);  
            else
                alert("Disciplina sem histórico disponivel");
        }
        else if(objeto.innerHTML=="TG II"){
            var hist=historico(tg2);
            if(hist.length>0)
                imprimeTela(hist);  
            else
                alert("Disciplina sem histórico disponivel");
        }
        else{
            var hist=historico(objeto.innerHTML);
            if(hist.length>0)
               imprimeTela(hist);  
            else
                alert("Disciplina sem histórico disponivel");
        }
    }
 }

//escolhe as optativas para colocar no HTML(caso especial de disciplina)
function pintarOptativas(optativas,optativasMat,tam){
    var cont=optativas.length -1 ;
    var k=0;
    var i=0;
    while(k<tam && i<optativas.length){
        var element=document.getElementById("OPT"+(k+1).toString());
        if(element!=null){
            if(optativas[i]=="Aprovado"){
                element.style.background="#6aa84f";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
            else if((optativas[i]=="Equivalência de Disciplina" || optativas[i]=="Dispensa de Disciplinas (com nota)")){
                element.style.background="#f1c232";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
            else if(optativas[i]=="Matrícula"){
                element.style.background="#0b5394";
                k++;
                optativasMaterias.push(optativasMat[i]); 
            }
                       
            
        }
        i++
    }
    if(k<tam){
        var find=true;
        for(i=k; i< tam;i++){
            var element=document.getElementById("OPT"+i.toString());
            if(element!=null){
                if((optativas[cont]=="Reprovado por nota" || optativas[cont]=="Reprovado por Frequência")){
                    element.style.background="#e06666";
                    optativasMaterias.push(optativasMat[i]);
                }
                cont--;
                
            }
        }
    }
}

function pegaAluno(xml,grr,aluno){
    var alunos=xml.getElementsByTagName("ALUNO");
    for(i=0;i<alunos.length;i++){
        if(alunos[i].childNodes[3].firstChild.nodeValue==grr.value)
            aluno.push(alunos[i]);
    }
}

function mostrarTabela(){
    aluno=[];
    var grr=document.getElementById("GRRAluno");
    if(grr.value=="" || grr.value==null || grr == null){
        alert("Você não digitou nenhum GRR");
        return false;
    }
    else{
        if(xml==null)
            xml=xmlMicoxLoader("alunos.xml");
        pegaAluno(xml,grr,aluno);
        if(aluno.length>0){
            limpaTabela();
            achaMateria(aluno);
        }
        else
            alert("Aluno "+grr.value+" não encontrado");
        return true;

    }
}

function limpaTabela(){
    var materias = document.getElementsByClassName("materia");
    for(i=0;i<materias.length;i++){
            materias[i].style.background="";
        }
}
