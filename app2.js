var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController', ['$scope', 'studentListService', 'questionListService', 'LocalStorageService', 
        function($scope, studentListService, questionListService, LocalStorageService){
    
    var qpc = this;
    
    qpc.students_completed = [];     //use service here
    qpc.questions_completed = [];
    
    qpc.getNextQuestion = function(){
        if(qpc.questions.length > 0){
            var index = Math.floor(Math.random() * qpc.questions.length);
            qpc.selected_question = qpc.questions[index];
            qpc.questions_completed.push(qpc.selected_question);
            qpc.questions.splice(index, 1);   //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp         
        }
        else{
            qpc.questions = qpc.questions_completed;
            qpc.questions_completed = [];
        }
    }
    
    qpc.getNextStudent = function(){
        if(qpc.students.length > 0){
            var index = Math.floor(Math.random() * qpc.students.length);
            qpc.selected_student = qpc.students[index];
            qpc.students_completed.push(qpc.selected_student);
            qpc.students.splice(index, 1);
        }
        else{
            qpc.students = qpc.students_completed;
            qpc.students_completed = [];
        }
    }
    qpc.getNext = function(){
        qpc.getNextQuestion();
        qpc.getNextStudent();
    }
    qpc.doCorrect = function(){
        qpc.selected_student.correct++;
        var wholeList = qpc.students.concat(qpc.students_completed);
        qpc.update(angular.toJson(wholeList));
        qpc.getNext();
    }
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
        var wholeList = qpc.students.concat(qpc.students_completed);        
        qpc.update(angular.toJson(wholeList));
        qpc.getNext();        
    }
    qpc.fetch = function() {
        return LocalStorageService.getData();
    }
    qpc.update = function(val) {
        return LocalStorageService.setData(val);
    }
    qpc.getStudents = function(){             //use getStudents service here
        var fromStorage = qpc.fetch();
        if(fromStorage){
            qpc.students = fromStorage;
            qpc.getNextStudent();
        }
        else{
            studentListService.getStudentList()
                .then(
                    function(response){     // if $http.get was successful, do this
                        qpc.students = response.data;
                        qpc.getNextStudent();
                    },
                    function(response){    // if $http.get was unsuccessful, do this
                        qpc.students = [];
                    }
                );
        }
    };
    qpc.getQuestions = function(){
        questionListService.getQuestionList()
        .then(
            function(response){     //what to do if $http.get was successful
                qpc.questions = response.data;
                qpc.getNextQuestion();
            },
            function(response){     //what to do if $http.get was unsuccessful
                qpc.questions = [];
            }
        );
    }
    qpc.getStudents();     // get students and questions now
    qpc.getQuestions();     
}]);

///// STUDENT LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    return studentListService;
}]);

///// QUESTION LIST FACTORY //////////////////////////////////////////////////
quizModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get questions list
    questionListService.getQuestionList = function(){
        return $http.get("questions.json");
    };
    return questionListService;
}]);

/// LOCAL STORAGE SERVICE FACTORY ////////////////////////////////////////////
quizModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            var data = angular.fromJson(val);
            return data; 
        }
    };
});