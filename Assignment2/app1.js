// Assignment 2: Quiz Program that randomly calls students and questions and keeps track of student's scores.

var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',['$scope', function($scope){
    
    var qpc = this;

    qpc.students = 
    [
        {
            name: "Jeffry Babb",
            correct: 0,
            wrong: 0
        },
        {
            name: "Brandon Miller",
            correct: 0,
            wrong: 0
        },
        {
            name: "Mary Miles",
            correct: 0,
            wrong: 0
        },
        {
            name: "Marian Smith",
            correct: 0,
            wrong: 0
        },
        {
            name: "John Doe",
            correct: 0,
            wrong: 0
        },
        {
            name: "Romeo Montague",
            correct: 0,
            wrong: 0
        },
        {
            name: "Benjamin Franklin",
            correct: 0,
            wrong: 0
        },
        {
            name: "Damian Marley",
            correct: 0,
            wrong: 0
        },
        {
            name: "James Brown",
            correct: 0,
            wrong: 0
        },
        {
            name: "Kashmir India",
            correct: 0,
            wrong: 0
        },
        {
            name: "Asha Katur",
            correct: 0,
            wrong: 0
        },
        {
            name: "Saru Brews",
            correct: 0,
            wrong: 0
        },
        {
            name: "Natasha Williams",
            correct: 0,
            wrong: 0
        },
        {
            name: "Bindu Jumanji",
            correct: 0,
            wrong: 0
        },
        {
            name: "Jesse James",
            correct: 0,
            wrong: 0
        },
        {
            name: "Jack Stock",
            correct: 0,
            wrong: 0
        },
        {
            name: "Juliet Capulet",
            correct: 0,
            wrong: 0
        },
        {
            name: "Taylor Swift",
            correct: 0,
            wrong: 0
        },
        {
            name: "Ginger Rooter",
            correct: 0,
            wrong: 0
        },
        {
            name: "Gilligan Island",
            correct: 0,
            wrong: 0
        }
    ];
    
    qpc.students_completed = [];
    
    qpc.questions = 
    [
        {
            question: "If set to _______, the JSON output will contain newlines and whitespace.",
            answer: "true"
        },
        {
            question: "If set to an _______, the JSON output will contain that many spaces per indentation.",
            answer: "integer"
        },
        {
            question: "The _______ is the glue between the template and controller.",
            answer: "scope"
        },
        {
            question: "What function manually starts up angular application?",
            answer: "angular.bootstrap"
        }, 
        {
            question: "What function determines if a reference is an Array?",
            answer: "angular.isArray"
        },
        {
            question: "The ________ directive allows you to specify custom behavior when an element is clicked.",
            answer: "ngClick"
        },
        {
            question: "What directive attaches a controller class to the view?",
            answer: "ngController"
        },
        {
            question: "The _______ service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.",
            answer: "$http"
        },
        {
            question: "The ________ service is responsible for instantiating controllers.",
            answer: "$controller"
        }, 
        {
            question: "The main purpose of the ________ service is to simplify debugging and troubleshooting.",
            answer: "$log"
        },
        {
            question: "The $http service is a function which takes a single argument — a configuration object — that is used to generate an HTTP request and returns a _______",
            answer: "promise"
        },
        {
            question: "What servive is a Factory that constructs Cache objects and gives access to them?",
            answer: "$cacheFactory"
        },
        {
            question: "What directive creates new scope?",
            answer: "ngController"
        },
        {
            question: "The $controller is dependant of the ________.",
            answer: "$injector"
        }, 
        {
            question: "The ________ directive instantiates a template once per item from a collection.",
            answer: "ngRepeat"
        },
        {
            question: "ngRepeat uses ________ to detect changes in the collection. When a change happens, ngRepeat then makes the corresponding changes to the ________.",
            answer: "$watchCollection, DOM"
        },
        {
            question: "To minimize creation of DOM elements, ngRepeat uses a function to _________ of all items in the collection and their corresponding DOM elements.",
            answer: "keep track"
        },
        {
            question: "If you do need to repeat duplicate items, you can substitute the default tracking behavior with your own using the ________ expression.",
            answer: "track by"
        },
        {
            question: "You can specify an ________ to be used as the root module for the application.",
            answer: "AngularJS module"
        }, 
        {
            question: "The $controller service returns an _______ of a given controller.",
            answer: "instance"
        }
    ];
    qpc.questions_completed = [];
    
    qpc.getNextQuestion = function(){
        
        if(qpc.questions.length > 0){
            var index = Math.floor(Math.random() * qpc.questions.length);
            
            qpc.selected_question = qpc.questions[index];
            
            qpc.questions_completed.push(qpc.selected_question);
            
            //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp
            qpc.questions.splice(index, 1);            
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
        qpc.getNext();
    }
    qpc.doWrong = function(){
        qpc.selected_student.wrong++;
        qpc.getNext();        
    }
    qpc.getNext();
    
}]);