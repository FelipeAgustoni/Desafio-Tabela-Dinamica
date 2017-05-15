//Executa quando o documento é carregado
var pessoas = []
var id = 0;

$(document).ready(function () {

		//Mascara para os campos cpf, data e rg
		$('#txtCpf').mask('999.999.999-99');
		$('#txtDataNascimento').mask('99/99/9999');
		$('#txtRg').mask('99.999.999-9');

        $("#btnAdicionar").click(function(){

        	// Atribuindo o valor do input id hidden em idPessoa
        	idPessoa = $("#id").val().trim();

        	//Validando campos obrigatorios
        	if (!$('#txtNome').val().trim() || !$('#selSexo').val().trim() || !$('#txtDataNascimento').val().trim() || !$('#txtCpf').val().trim()) {
        		alert('Campo(s) obrigatorio(s) não preenchido(s) !');
        		clear();
        	} else {

        	// Verificando se tem id ou nao, para saber se é alterar ou salvar
    		if (idPessoa != ""){

    			for (var i = 0; i < pessoas.length; i++) {
				pessoa = pessoas[i];

					if(pessoa.id == idPessoa){
	    				pessoa.nome = $("#txtNome").val();
	    				pessoa.sexo = $("#selSexo").val();
	    				pessoa.data = $("#txtDataNascimento").val();
	    				pessoa.cpf = $("#txtCpf").val();
	    				pessoa.rg = $("#txtRg").val();
	    			}
    			}
    		}

			else {            
	            pessoas.push({ // Insere no vetor
	            	id: ++id,
	            	nome: $("#txtNome").val(),
	            	sexo: $("#selSexo").val(),
	            	data: $("#txtDataNascimento").val(),
	            	cpf: $("#txtCpf").val(),
	            	rg: $("#txtRg").val()
	        	});
        	}
        }

        	clear();

    		carregarTabela();

        });


    update = function(id){
		for (var i = 0; i < pessoas.length; i++) {
			pessoa = pessoas[i];
			if(pessoa.id == id){
				$("#id").val(pessoa.id);
				$("#txtNome").val(pessoa.nome);
				$("#selSexo").val(pessoa.sexo);
				$("#txtDataNascimento").val(pessoa.data);
				$("#txtCpf").val(pessoa.cpf);
				$("#txtRg").val(pessoa.rg);
			}
		}
	}

        //funcao para limpar os campos
        function clear(){
        	$("#id").val("");
			$('#txtNome').val("");
		    $('#selSexo').val("");
		    $('#txtDataNascimento').val("");
		    $('#txtCpf').val("");
		    $('#txtRg').val("");
        }

    // Removendo um registro da tabela
    remover = function(id) {

	   	var confirma = confirm("Deseja realmente excluir este registro ? O Processo não poderá ser revertido !");
	    
	    if(confirma){
	    	// Percorre o vetor, comparando se o id que recebeu como parametro na funcao
			// é igual ao id do botao em que o usuario clicou na tr da tabela
	    	for (var i = 0; i < pessoas.length; i++) {
	    		pessoa = pessoas[i];
	    		if(pessoa.id == id){
	    			// Splice espera 2 parametros, indice - qtd
	    			// remove aquele elemento, no indice i, 1 registro
	    			pessoas.splice(i, 1);
	    		}
	    	}

	    	clear();

	    	carregarTabela();
	    }
    }

});

//prepara a tabela
function carregarTabela () {

	$("#tbodyTable").html(''); // limpa a tabela
	for (var i = 0; i < pessoas.length; i++) {
		var pessoa = pessoas[i];

		// analogamente, String Builder do Java
		var html = `
    		<tr>
    			<td>${pessoa.nome}</td>
    			<td>${pessoa.sexo == "M" ? "Masculino" : "Feminino"}</td>
    			<td>${pessoa.data}</td>
    			<td>${pessoa.cpf}</td>
    			<td>${pessoa.rg}</td>

    			<td>
        			<button type="button" class="btn btn-success" onclick="update(${pessoa.id})">
        			<span class="glyphicon glyphicon-pencil">
        			</span>
        			</button>

        			&nbsp

        			<button type="button" class="btn btn-danger" onclick="remover(${pessoa.id})">
        			<span class='glyphicon glyphicon-remove'>
        			</span>
        			</button>
    			</td>
    		</tr>
    	`;

    	//Insere na tabela 
		$("#tbodyTable").append(html);
	}

	// Contador para mostrar o total de Registros de acordo com o length do vetor
	$('#totalReg').text(pessoas.length);
}

/*
Atualizando o "Total de Registros: " da tabela
            $("#tbodyTable").append(html);
            $('#totalReg').text($('#tbodyTable > tr').length); //document.getElementById('tbodyTable').rows.length);
*/