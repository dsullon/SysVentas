<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Usuario extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("usuario_model");
	}
    
    public function login()
    {
        if($this->input->post('usuario') && $this->input->post('password'))
        {
            $data = array(
                'usuario' => $this->input->post("usuario"),
                'password' => md5($this->input->post('password'))
            );	
            $user = $this->usuario_model->login($data);
            if($user){
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success","user" => $user));
            }else{
                header("HTTP/1.1 404 Not Found");
                echo json_encode(array("respuesta" => "No se encontró resultados."));
            }
        } 
        else
        {
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }
}