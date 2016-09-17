<?php

class Evaluation_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function get($id = null)
    {
        if (!is_null($id)) {
            $query = $this->db->select('*')->from('evaluation')->where('id', $id)->get();
            if ($query->num_rows() === 1) {
                return $query->row_array();
            }
            return null;
        }
        
         $query = $this->db
        ->select('e.id, et.name as type, e.startDate, e.endDate, e.note, e.is_closed as isClosed, 
            e.show_to_evaluated as showToEvaluate')
        ->from('evaluation as e')
        ->join('evaluation_type as et', 'e.evaluation_type_id = et.id')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getActive()
    {
         $query = $this->db
        ->select('e.id, et.name as type, e.startDate, e.endDate, e.note, e.is_closed as isClosed, 
            e.show_to_evaluated as showToEvaluate')
        ->from('evaluation as e')
        ->join('evaluation_type as et', 'e.evaluation_type_id = et.id')
        ->where('e.is_closed', '0')
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getToEvaluate($id)
    {        
         $query = $this->db
        ->select('e.id, et.name as type, e.startDate, e.endDate, e.note, e.is_closed as isClosed, 
            e.show_to_evaluated as showToEvaluate')
        ->from('evaluation as e')
        ->join('evaluation_type as et', 'et.id = e.evaluation_type_id', 'INNER')
        ->join('evaluator as ev', 'ev.evaluation_id = e.id', 'INNER')
        ->where(array('ev.evaluator_id' => $id, 'is_closed' => '0'))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getByEvaluated($id)
    {
        $query = $this->db
        ->distinct()
        ->select('e.id, et.name as type, e.startDate, e.endDate, e.note, e.is_closed as isClosed, 
            e.show_to_evaluated as showToEvaluate')
        ->from('evaluation as e')
        ->join('evaluation_type as et', 'et.id = e.evaluation_type_id', 'INNER')
        ->join('evaluated as ev', 'ev.evaluation_id = e.id', 'INNER')
        ->where(array('ev.evaluated_id' => $id, 'is_closed' => '0'))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getQuestion($evaluation, $evaluator, $evaluated)
    {        
         $query = $this->db
        ->select('eq.evaluator_id, eq.evaluation_id, eq.evaluated_id, eq.question_id, eq.answer, 
        q.question_description, q.evaluation_criteria_id as question_criteria, ec.name as criteria_name')
        ->from('evaluated_question eq')
        ->join('evaluation_question as q', 'eq.question_id = q.id', 'INNER')
        ->join('evaluation_criteria as ec', 'q.evaluation_criteria_id = ec.id', 'INNER')
        ->where(array('eq.evaluation_id' => $evaluation, 'evaluator_id' => $evaluator, 'evaluated_id' => $evaluated))
        ->order_by('q.evaluation_criteria_id', "asc")
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getQuestionByEvaluated($evaluation, $evaluated)
    {        
         $query = $this->db
        ->select('eq.evaluator_id as evaluator, eq.evaluation_id as evaluation, eq.evaluated_id as evaluated, 
            eq.answer, q.question_description as question, q.evaluation_criteria_id as criteria')
        ->from('evaluated_question eq')
        ->join('evaluation_question as q', 'eq.question_id = q.id', 'INNER')
        ->where(array('eq.evaluation_id' => $evaluation, 'eq.evaluated_id' => $evaluated))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getQuestionToSelfEvaluation($evaluation, $evaluated)
    {        
         $query = $this->db
        ->select('eq.evaluation_id, eq.evaluated_id, eq.question_id, eq.answer, 
        q.question_description, q.evaluation_criteria_id as question_criteria, ec.name as criteria_name')
        ->from('self_evaluation eq')
        ->join('evaluation_question as q', 'eq.question_id = q.id', 'INNER')
        ->join('evaluation_criteria as ec', 'q.evaluation_criteria_id = ec.id', 'INNER')
        ->where(array('eq.evaluation_id' => $evaluation, 'evaluated_id' => $evaluated))
        ->order_by('q.evaluation_criteria_id', "asc")
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getComments($evaluation)
    {        
         $query = $this->db
        ->select('c.id, c.comment_description as description, c.response_type_id as response_type, c.comment_description, c.comment_type')
        ->from('evaluation_comment c')
        ->where(array('c.evaluation_id' => $evaluation))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getCommentsToEvaluation($evaluation, $evaluator, $evaluated, $type)
    {        
         $query = $this->db
        ->select('ec.evaluation_id, ec.evaluator_id, ec.evaluated_id, ec.comment_id, ec.response, 
        c.comment_description, c.response_type_id as response_type')
        ->from('evaluated_comment ec')
        ->join('evaluation_comment as c', 'ec.comment_id = c.id', 'INNER')
        ->where(array('ec.evaluation_id' => $evaluation, 'evaluator_id' => $evaluator, 'evaluated_id' => $evaluated, 
        'comment_type' => $type))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }

    public function getCommentsByEvaluated($evaluation, $evaluated)
    {        
         $query = $this->db
        ->select('ec.comment_id as id, ec.evaluator_id as evaluator, ec.evaluation_id as evaluation, ec.evaluated_id as evaluated, 
            ec.response, c.comment_description as comment')
        ->from('evaluated_comment ec')
        ->join('evaluation_comment as c', 'ec.comment_id = c.id', 'INNER')
        ->where(array('ec.evaluation_id' => $evaluation, 'ec.evaluated_id' => $evaluated))
        ->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        }
        return null;
    }
    
    public function save($obj)
    {
        if (!$obj["questions"] || count($obj["questions"])== 0) {
            log_message('ERROR','No se cargarón las preguntas de la evaluación.');
            return FALSE;
        }

        if (!$obj["comments"] || count($obj["comments"])== 0) {
            log_message('ERROR','No se cargarón los comentarios de la evaluación.');
            return FALSE;
        }

        $id = 0;
        $this->db->trans_begin();
        $this->db
        ->set(array('evaluation_type_id' => $obj["type"], 'startDate' => $obj["startDate"],
            'endDate' => $obj["endDate"], 'note' => $obj["note"]))
        ->insert('evaluation');
        if ($this->db->affected_rows() === 1) {
            $id = $this->db->insert_id();
        }else{
            log_message('ERROR','No se creo el id de la evaluación');
            return FALSE;
        }
        /*INSERT QUESTIONS TO CURRENT EVALUATION*/
        foreach ($obj["questions"] as $question) {
            $this->db->set(array(
                'evaluation_id' => $id,
                'question_description' => $question["description"],
                'evaluation_criteria_id' => $question["evaluation_criteria_id"],
                'question_type' => $question["question_type"]))
            ->insert('evaluation_question');
        }
        /*INSERT COMMENTS TO CURRENT EVALUATION*/
        foreach ($obj["comments"] as $question) {
            $this->db->set(array('evaluation_id' => $id, 
            'comment_description' => $question["description"],
            'response_type_id' => $question["response_type_id"],
            'comment_type' => $question["comment_type"]))
            ->insert('evaluation_comment');
        }

        /*LOAD CURRENT QUESTIONS*/
        $query = $this->db
        ->select('*')
        ->from('evaluation_question as e')
        ->where(array('e.evaluation_id'=> $id, 'e.question_type' => '0'))
        ->get();
        if ($query->num_rows() > 0) {
            $currentQuestions = $query;
        }else{
            log_message('ERROR','No se cargarón las preguntas de la evaluación.');
            return FALSE;
        }
        /*LOAD CURRENT COMMENTS*/
        $query = $this->db
        ->select('*')
        ->from('evaluation_comment as e')
        ->where('e.evaluation_id', $id)
        ->get();
        if ($query->num_rows() > 0) {
            $currentComments = $query;
        }else{
            log_message('ERROR','No se cargarón los comentarios de la evaluación.');
            return FALSE;
        }

        if($obj["evaluators"] && count($obj["evaluators"])>0){
            foreach ($obj["evaluators"] as $evaluator) {
                if($evaluator && count($evaluator["evaluateds"])>0){
                    $this->db
                    ->set(array('evaluation_id' => $id, 'evaluator_id' => $evaluator["id"]))
                    ->insert('evaluator');
                    /*INSERT EVALUATES*/
                    foreach ($evaluator["evaluateds"] as $evaluated) {
                        $this->db->set(array('evaluation_id' => $id, 'evaluator_id' => $evaluator["id"],
                        'evaluated_id' => $evaluated["id"]))
                        ->insert('evaluated');
                        /* INSERT QUESTIONS TO EVALUATE*/
                        foreach ($currentQuestions->result() as $question) {
                            $this->db->set(array('evaluator_id' => $evaluator["id"], 
                            'evaluated_id' => $evaluated["id"], 
                            'evaluation_id' => $id, 
                            'answer' => "",
                            'question_id' => $question->id))
                            ->insert('evaluated_question');
                        }
                        /* INSERT COMMENTS TO EVALUATE*/
                        foreach ($currentComments->result() as $comment) {
                            $this->db->set(array('evaluator_id' => $evaluator["id"], 
                            'evaluated_id' => $evaluated["id"], 
                            'evaluation_id' => $id, 
                            'response' => "",
                            'comment_id' => $comment->id))
                            ->insert('evaluated_comment');
                        }
                    }
                }else{
                    log_message('ERROR','No se ha asignado evaluados');
                    return FALSE;
                }
            }
        }else{
            log_message('ERROR','No se ha asignado evaluadores');
            return FALSE;
        }

        /* LOAD CURRENT EVALUATEDS */
        $query = $this->db
        ->distinct()
        ->select('e.evaluated_id')
        ->from('evaluated e')
        ->where(array('e.evaluation_id' => $id))
        ->get();

        if($query->num_rows())
        {
            $currentEvaluateds = $query;
            /*LOAD CURRENT QUESTIONS TO SELF-EVALUATION*/
            $query = $this->db
            ->select('*')
            ->from('evaluation_question as e')
            ->where(array('e.evaluation_id'=> $id, 'e.question_type' => '1'))
            ->get();
            if ($query->num_rows() > 0) {
                $currentQuestions = $query;
                foreach($currentEvaluateds->result() as $evaluated){
                    /* INSERT QUESTIONS TO EVALUATE*/
                    foreach ($currentQuestions->result() as $question) {
                        $this->db->set(array( 
                        'evaluated_id' => $evaluated->evaluated_id, 
                        'evaluation_id' => $id, 
                        'answer' => "",
                        'question_id' => $question->id))
                        ->insert('self_evaluation');
                    }
                }
            }else{
                log_message('ERROR','No se cargarón las preguntas de la auto-evaluación.');
                return FALSE;
            }
        }
        else
        {
            log_message('ERROR','No se pudo cargar los datos de los evaluados');
            return FALSE; 
        }
        
        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }
        else
        {
            $this->db->trans_commit();
            return true;
        }
    }    

    public function evaluate($question)
    {
        $this->db
        ->set(array('answer' => $question['answer']))
        ->where(array('evaluation_id' => $question['evaluation'], 'evaluator_id' => $question['evaluator'],
            'evaluated_id' => $question['evaluated'], 'question_id' => $question['question_id']))
        ->update('evaluated_question');
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function selfassess($question)
    {
        $this->db
        ->set(array('answer' => $question['answer']))
        ->where(array('evaluation_id' => $question['evaluation'], 'evaluated_id' => $question['evaluated'],
            'question_id' => $question['question_id']))
        ->update('self_evaluation');
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function updateComment($comment)
    {
        $this->db
        ->set(array('response' => $comment['response']))
        ->where(array('evaluation_id' => $comment['evaluation'], 'evaluator_id' => $comment['evaluator'],
            'evaluated_id' => $comment['evaluated'], 'comment_id' => $comment['comment']))
        ->update('evaluated_comment');
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function showToEvaluated($obj)
    {
        $this->db
        ->set(array('show_to_evaluated' => '1'))
        ->where(array('id' => $obj['evaluation']))
        ->update('evaluation');
        return $this->db->affected_rows();
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function changeStatusToClose($obj)
    {
        $this->db
        ->set(array('is_closed' => '1'))
        ->where(array('id' => $obj['evaluation']))
        ->update('evaluation');
        return $this->db->affected_rows();
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }

    public function delete($id)
    {
        $this->db->trans_begin();

        $this->db
        ->where('evaluation_id', $id)
        ->delete('self_evaluation');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluated_comment');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluated_question');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluated');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluator');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluation_comment');

        $this->db
        ->where('evaluation_id', $id)
        ->delete('evaluation_question');

        $this->db
        ->where('id', $id)
        ->delete('evaluation');
        
        if ($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();
        }
        else
        {
            $this->db->trans_commit();
            return true;
        }
    }
}