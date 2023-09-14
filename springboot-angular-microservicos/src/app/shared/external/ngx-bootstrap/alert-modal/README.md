# Configurações necessárias para ativar o alert-modal no sistema.
Primeiro devemos instalar a bilioteca do ngx-Bootstrap

# Site:
https://valor-software.com/ngx-bootstrap/#/documentation

# Para instalar:
npm install ngx-bootstrap --save

# Módulo necessário dentro do app.module
ModalModule.forRoot(),

# Como utilizar:
Injetar o serviço (AlertModalService), dentro do componente que será enviado o alerta.

Depois basta chamar algum dos metodos do Serviço, passando os parâmetros:

Mensagem e (Opcional) Tempo para fechamento automático 
