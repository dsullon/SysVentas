<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Empleado extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("empleado_model");
	}
    
    public function login()
    {
        if($this->input->post('usuario') && $this->input->post('password'))
        {
            $data = array(
                'usuario' => $this->input->post("usuario"),
                'password' => md5($this->input->post('password'))
            );	
            $user = $this->empleado_model->login($data);
            if($user){
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success","user" => $user));
            }
        } 
        else
        {
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }
}