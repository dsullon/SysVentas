<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Evaluation extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("evaluation_model");
	}

    public function getToEvaluate($user)
    {
        $data = $this->evaluation_model->getToEvaluate($user);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }
    
    public function getByEvaluated($user)
    {
        $data = $this->evaluation_model->getByEvaluated($user);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getQuestion($evaluation, $evaluator, $evaluated)
    {
        $data = $this->evaluation_model->getQuestion($evaluation, $evaluator, $evaluated);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getQuestionByEvaluated($evaluation, $evaluated)
    {
        $data = $this->evaluation_model->getQuestionByEvaluated($evaluation, $evaluated);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getQuestionToSelfEvaluation($evaluation, $evaluated)
    {
        $data = $this->evaluation_model->getQuestionToSelfEvaluation($evaluation, $evaluated);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getComments($evaluation)
    {
        $data = $this->evaluation_model->getComments($evaluation);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getCommentsToEvaluation($evaluation, $evaluator, $evaluated, $type)
    {
        $data = $this->evaluation_model->getCommentsToEvaluation($evaluation, $evaluator, $evaluated, $type);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getCommentsByEvaluated($evaluation, $evaluated)
    {
        $data = $this->evaluation_model->getCommentsByEvaluated($evaluation, $evaluated);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }        
    }

    public function getOne($id)
    {
        $data = $this->evaluation_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }     
    }

    public function getAll()
    {
        $data = $this->evaluation_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }
    }

    public function getActive()
    {
        $data = $this->evaluation_model->getActive();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }     
    }

    public function save()
    {  
        if($this->input->post("type") && $this->input->post("startDate") && $this->input->post("endDate") && 
        $this->input->post("evaluators"))
        {
            $data = array(
                'type' => $this->input->post('type'),
                'startDate' => $this->input->post('startDate'),
                'endDate' => $this->input->post('endDate'),
                'evaluators' => $this->input->post('evaluators'),
                'note' => $this->input->post('note'),
                'questions' => $this->input->post('questions'),
                'comments' => $this->input->post('comments')
            );
            $addNew = $this->evaluation_model->save($data);
            if($addNew)
            { 
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success", 'data' => $data));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $this->input->post()));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function delete()		
    {
        if($this->input->post('evaluation'))
        {
            $delete = $this->evaluation_model->delete($this->input->post('evaluation'));		
            if($delete)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));		
            }
            else{
                header("HTTP/1.1 500 Internal Server Error");                		
                echo json_encode(array("respuesta" => "Error al procesar los datos"));
            }		
        }
        else		
        {
            header("HTTP/1.1 400 Bad Request");		
            echo json_encode(array("respuesta" => "Faltan completar datos."));		
        }		
    }

    public function evaluate()
    {
        if($this->input->post('evaluation') && $this->input->post('evaluator') && 
        $this->input->post('evaluated') && $this->input->post('question_id'))
        {
            $question = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluator' => $this->input->post('evaluator'),
                'evaluated' => $this->input->post('evaluated'),
                'question_id' => $this->input->post('question_id'),
                'answer' => $this->input->post('answer')
            );		
            $evaluate = $this->evaluation_model->evaluate($question);
            if($evaluate)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function selfassess()
    {
        if($this->input->post('evaluation') && $this->input->post('evaluated') 
        && $this->input->post('question_id'))
        {
            $question = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluated' => $this->input->post('evaluated'),
                'question_id' => $this->input->post('question_id'),
                'answer' => $this->input->post('answer')
            );		
            $evaluate = $this->evaluation_model->selfassess($question);
            if($evaluate)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function showToEvaluated()
    {
        if($this->input->post('evaluation'))
        {
            $evaluation = array(
                'evaluation' => $this->input->post('evaluation')
            );		
            $success = $this->evaluation_model->showToEvaluated($evaluation);
            if($success)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function changeStatusToClose()
    {
        if($this->input->post('evaluation'))
        {
            $evaluation = array(
                'evaluation' => $this->input->post('evaluation')
            );		
            $success = $this->evaluation_model->changeStatusToClose($evaluation);
            if($success)
            {   
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $evaluate));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function updatecomment()		
    {
        if($this->input->post('evaluation') && $this->input->post('evaluator') && 
        $this->input->post('evaluated') && $this->input->post('comment'))
        {
            $comment = array(
                'evaluation' => $this->input->post('evaluation'),
                'evaluator' => $this->input->post('evaluator'),
                'evaluated' => $this->input->post('evaluated'),
                'comment' => $this->input->post('comment'),
                'response' => $this->input->post('response')
            );
            $success = $this->evaluation_model->updateComment($comment);		
            if($success)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));		
            }
            else{
                header("HTTP/1.1 500 Internal Server Error");                		
                echo json_encode(array("respuesta" => "failedProcess", 'data' => $success));
            }		
        }
        else		
        {
            header("HTTP/1.1 400 Bad Request");		
            echo json_encode(array("respuesta" => "Faltan completar datos."));		
        }		
    }
}