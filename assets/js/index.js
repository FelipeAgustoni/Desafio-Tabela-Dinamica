//Executa quando o documento é carregado

var pessoas = []
var id = 0;

$(document).ready(function () {

		//Mascara para os campos cpf, data e rg
		$('#txtCpf').mask('999.999.999-99');
		$('#txtDataNascimento').mask('99/99/9999');
		$('#txtRg').mask('99.999.999-9');

        $("#btnAdicionar").click(function(){
			//Validando campos obrigatorios
        	if (!$('#txtNome').val() || !$('#selSexo').val() || !$('#txtDataNascimento').val() || !$('#txtCpf').val()) {
        		alert('Campo(s) obrigatorio(s) nao preenchido');
        	} else {            
	            pessoas.push({
	            	id: ++id,
	            	nome: $("#txtNome").val(),
	            	sexo: $("#selSexo").val(),
	            	data: $("#txtDataNascimento").val(),
	            	cpf: $("#txtCpf").val(),
	            	rg: $("#txtRg").val()
	            });

	            carregarTabela();
        	}

        });

    // Removendo um registro da tabela
    remover = function(id) {
	   	var confirma = confirm("Deseja realmente excluir este registro ? O Processo não poderá ser revertido !");
	    
	    if(confirma){
	    	for (var i = 0; i < pessoas.length; i++) {
	    		pessoa = pessoas[i];
	    		if(pessoa.id == id){
	    			pessoas.splice(i, 1);
	    		}
	    	}
	    	carregarTabela();
	    }
    }

});

function carregarTabela () {
	$("#tbodyTable").html('');

	for (var i = 0; i < pessoas.length; i++) {
		var pessoa = pessoas[i];
		var html = `
    		<tr>
    			<td>${pessoa.nome}</td>
    			<td>${pessoa.sexo}</td>
    			<td>${pessoa.data}</td>
    			<td>${pessoa.cpf}</td>
    			<td>${pessoa.rg}</td>

    			<td>
        			<button type="button" class="btn btn-success">
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

		$("#tbodyTable").append(html);
	}

	$('#totalReg').text(pessoas.length);
}

/*
//Atualizando o "Total de Registros: " da tabela
            $("#tbodyTable").append(html);
            $('#totalReg').text($('#tbodyTable > tr').length); //document.getElementById('tbodyTable').rows.length);
*/