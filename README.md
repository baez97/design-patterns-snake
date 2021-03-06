# Design Patterns in Software Engineering
### Introduction
Design Patterns are a great set of practices that may help us gain flexibility and reusability in our software solutions, do you know them? There are tons of them, in fact, a whole book was needed in order to define them. 

This repository intends to be a kind of introductory article to Design Patterns by building the _Snake Game_ step by step using them. Both the code and this README has been written divided in "Chapters", so that each Chapter corresponds to a Design Pattern/Principle. I hope you find it useful :) Let's start with the definition of what a _Design Pattern_ is.

### Definition
According to _Gof_ book __Design Patterns: Elements of Reusable Object-Oriented Software__, this is the definition:

> Design Patterns in this book are descriptions of communicating objects and classes that are customized to solve a general design problem in a particular context.

We can conclude two facts from this definition:
* Design Patterns are applied in __Object Oriented Programming__, as we are dealing with classes and objects.
* Design Patterns are related to the way we can customize the relationships between classes and objects in our solution. That is, we are not dealing with how we code, but with how we design the classes.

But how can you describe the relationships between objects? Obviously with schemes, and the more universal the language of our schemes the better, that is where UML comes in.

### UML
UML stands for Universal Modeling Language, and it is a tool we can use for sharing our models with our team or others. It purposes different types of schemes for modeling, but we are focusing on one of the most important ones for Design Patterns: the [Class Diagram](https://en.wikipedia.org/wiki/Class_diagram).

> However, you do not need to know UML to understand this article. In fact, I am not using any UML modeling tool or following its schemes in an strict way. Instead, I am using Keynote to draw a basic scheme of the classes we are using and how they are connected. Nevertheless, I highly recommend having a look to the UML documentation if you want to go further with Software Design.

#### How should I deal with this article?
Clone this repo, checkout the first commit, and open this repo in two different tabs, one with this README and the other one with the commit record. Install _NodeJS_, add it to your path and run `npm install` and `npm start` on a Terminal/CMD once you have navigated to the project's folder.

Now, you can read chapter by chapter by comparing it to the commit asociated, as there is one commit per chapter. This way, you can implement the new functionality at your own and then compare with the final solution. Also this may be useful for easily finding the code that is related to each pattern, as each commit has the name of the pattern applied on its commit message. Let's begin! 

## Chapter 0: The Snake Game
One of the best ways to learn Design Patterns is through a game, as there is a lot of interactivity between the objects, and you can see it graphically. The Snake Game happens to be a good example for this topic, so in this repository we are dealing with the development of the game using some Design Patterns. You can follow the Commit history in order to see the progression from one Pattern to the next one.

### Definion of the Game
The main purpose of this game is to make the snake eat the food of the scenario without getting hit with the obstacles, walls or with the snake itself (whose lenght increases as it eats). How long can you survive?

The concept is simple, but there are a lot of Snake Games with different rules and behaviours, so the first step is to define how our Snake Game is going to be.

#### Functional Definition
I raise the idea of working with an NxN board of cells, where the head of the snake starts at position (N,N), and every X seconds the snake moves by itself in the direction the player sets, being the first direction up.

The board will have obstacles and fruits at random positions, so that if the snake reaches them they will affect its length:
* Obstacles will decrease the lenght of the snake by one.
* Fruits will increase the lenght of the snake by one, but they can disappear from the board after some seconds, so they will only take effect if the snake reaches them before they disappear.

The game will be generating fruits in random positions along the game, and the player loses when the snake reaches 0 length.

### Technical approach
A two dimensional array seems to be a correct way of dealing with the cells, but how can we deal with all the positions of the snake? We could set a snake-position collection and compare it with the cells' position every "tick" of the game, updating that collection everytime the snake moves, increases or decreases its length... But that is not for what you are reading this.

#### Respecting the Main Purpose of a class
Even if the Design Patterns book includes a list of well-known patterns, the objective of learning them is to achive a decoupled and flexible solution for our software projects. So we should start from the basic things, right?

In order to increase the flexibility of our solution, what we are going to do is to develop it in a fine-grained modular way, using little objects where we can delegate logic so that our classes have a well defined main purpose, and their behaviour is focused on that.

#### Cell Counter approach
We can face the all-snake-positions problem by dealing with each cell as an object itself, and not as a pair of integers in an array. This way, each cell can have attributes and methods, and we can solve the problem in a simpler way:
1. A Cell class that has a counter attribute.
2. Every time the snake reaches a position, it sets the Cell's counter to its current lenght.
3. Every tick of the game, each cell decreases its counter, and if it is 0, it becomes empty.

And that's it, simple, flexible and easy to maintain. So we have a deal, let's begin!

#### Programming Language
As stated in the [Definition Section](#definition), Design Patterns just rely on how objects communicate, not on how they are coded. The only constrain for choosing a language if you want to learn DP is that it should support Object Oriented Programming, that is, declaration of classes and objects.

I chose JavaScript for three reasons:
* It has a minimalist syntax, so that you can focus on objects.
* Web development usually requires less lines of code for the view, and JavaScript is the best language for it.
* There are very useful frameworks in the community like React for maintaining the view synchronized with the model without having to write the code for updating it.

#### Coding
Inside the `src` folder of my new `create-react-app` project, I am setting two folders: View and Model. Each class on the model will have its corresponding view, allowing me to develop the game in a modular way.
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/1-Setup.png"/>
</p>

> In order to focus on Design Patterns, this article will not explain the View Coding or the framework details, but just the Model.

## Chapter 1: I want to talk to my lawyer
The first step would be defining classes for the Snake and the Cells, but how do we connect both? Well, the Cells may have a Snake property and viceversa, so that they can communicate commands with each other like "Hey Cell, I am here now" or "Hey snake, there's an obstacle here, decrease your length". That would be correct, good, and solves the problem.

But what would happen...
* If we decided to create another type of cell, like an obstacle, would we had to reimplement the Snake class?
* If there are more actors in the game like Enemies, another Snake, moving food... would we had to reimplement the Cells class and their relationships?

By connecting both classes directly, we are losing flexibility and reusability.

> In real world, it is not a good idea to program following barely possible future changes. We should program today for solving the problems of today. This article forces the implementation of Design Patterns just for learning, and some situations are raised so that we can understand the advantages of using them.

### The Mediator Pattern
Mediator is an structural pattern that encapsulates the way two classes interact within a class. That is, instead of connecting two classes directly, we connect both to a higher class that will be in charge of their interaction. 

In the book, this problem is described using a form example where different widgets of the form (text inputs, checkboxes, radio buttons...) depends on each other behaviour. That is, a particular textfield should be disabled unless a particular radio button is selected. If we connect both classes, the text input and the radio button directly, and then we need to add a third widget or reuse this connection in another form, it is much more complicated to do so than if we wrap all the widget in a Form class that has connected all the elements and controls the relations between them.

In this game, how could be call the mediator class? Well, it seems like its main purpose will be contain the snake and a collection of cells. What about `Board`? 
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/2-Mediator.png"/>
</p>

### Implementation
The board class will create a Snake and a collection of Cells in its constructor, and it will contain the logic of the interaction between both. 
In order to see if everything went well, I developed a simple GUI that displays the counter of every cell of the board.
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/3-CounterView.png"/>
</p>

But the purpose of the `Board` class was not only to contain the cells collection and the Snake, but also to communicate them. Let's add a `tick` method to it that calls the `tick` method of each cell, and executes the `move` method of the Snake, which will make the Snake move upwards by now. From the View code, I have linked the `keyPressed` event to this `tick` method. This is the result:
<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/4-SnakeCounters.gif"/>
</p>

## Chapter 2: Tell me how you are, and I'll tell you what you'll do
It does not happen to make any sense to move the snake only when the user presses a key. Instead, the Snake should be moving every X milliseconds, and change the direction when the user presses a key, just like it is stated at the [Functional Definition](#functional-definition).

The first step for that is to find a way to repeat an operation every X milliseconds, for what I am using JavaScript SetInterval on the BoardView.jsx class. It could also be done at the Board class, but as it's a logic that is not related to Design Patterns, I prefer to keep the Model clean, delegating in the View things like intervals or key-press events.

This interval will call to the board's `tick` method every 500ms, which is already defined and works fine as we could test in the previous chapter. It is the Snake `move` method where changes should start. 

First of all, the Snake class should have some kind of _direction_ property that can tell us how we should modify the position in each tick. Something like...
 ```
function move(setPositionFunction) {
  if ( this.direction == "UP"   ) this.y = this.y - 1;
  if ( this.direction == "DOWN" ) this.y = this.y + 1;
  ...
  setPositionFunction(this.x, this.y);
}
```

Usually in this kind of games, this direction checking is repeated throughout the whole project, by a lot of different classes. Is this a problem? absolutely not, it is perfectly correct, but _GoF_ purposes another way of doing this stuff.

### The State pattern
When the behaviour of a class depends on the value of another variable, you can make that class delegate its behaviour on another object: its State object. This way, instead of asking of all the possibilities through `if` or `switch` stamentes, you can just ask that object to perform the operation, and you change the object whenever the state of the class changes.

This is usually translated into the creation of an _State_ abstract class with the delegated operation, and some concrete classes that inherits it, one for each possibility of the variable (_Connected_ and _Disconnected_, _Up_ and _Down_, _Moving_ and _Stopped_...).

### Implementation
In our case, the behaviour of the Snake directly depends on its direction. This Design Pattern invites us to create an state object like `MovingUp` that has a `move` method. The Snake would have a property `state`, and when the Board asks the Snake to move, the Snake will rely on its `state` object by simply calling its `move` method. Just like `MovingUp`, we would create `MovingDown`, `MovingLeft` and `MovingRight`, being all of them children of the abstract class _State_.

<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/5-State.png"/>
</p>

Now, when the Snake is asked to move, it will just rely on its State passing the SetPositionFunction callback that the Board provides to it.
The `Board` class has two different methods for the snake movement: `move()` will tell the snake that is time to move, while `setPosition` will be called by the Snake (actually, by its `State`) in order to set its position. 
> `setPosition` is receiving the position that the Snake is trying to get, but it has not moved yet. When the Board checks if there is any collission, it will change its position, or tell the snake that it has been hit.

## Chapter 3: Wow, what is that made of?
The Snake can move freely so far, too freely. Shall we add some obstacles? In fact, why don't we add the fruits too? Okey, it seems obvious that both should be added at the beginning of the Board construction, but how should we put them?

Maybe we should set a couple of constants that indicate the initial number of fruits and obstacles, and then add some logic that generates random positions for both. This implies some constrains:
* The positions are obtained from 2 random numbers, one for the X and one for the Y.
* The positions have to be inside the board.
* If a cell already contains an obstacle or a fruit, it cannot contain any other one.
* They should not be over the Snake initial position, so the Snake has to be created and set before them.

It seems easy to implement, isn't it? But, as always in this game, it could be more complicated in the future. For example:
* We may want to set the obstacles in a way that they don't surround the Snake.
* We may want to add levels to the game, having each one a different configuration of obstacles.
* We may want to add different kinds of board, with other obstacles, interactive beings, etc.

### The Builder pattern
When the creation of a set of objects implies complicated or flexible logic, this Design Pattern advises us to create a `Builder` object that will contain all that creation logic. This way, we are not only removing all that ugly code from the `Board` class, but we are also gaining flexibility. Why? well, let's have a look to the implementation in order to understand it by example.

<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/6-Builder.png"/>
</p>

Well, the `Board` class will have an association to a instance of a `Builder`, and will ask him to create all the board objects that are needed. Let's consider now that we want to add new levels, we can create a Level2Builder that extends the parent Builder, and associate it to the Board class. Magic! The level has changed without touching a single line of code of the `Board` class.

### Implementation
We create a `Builder` class and instantiate it in the `Board` class constructor as as property of it. The `Buider` class will have a _master_ method that will execute a set of steps for creating every object needed in order, and simple method for instantiating simple objects so that the `Board` can use them as auxiliar methods.

By now, we are instantiating ordinary cell objects for the obstacles and fruit. Obstacles will have a counter of 8, and fruits a counter of 9. (Soon we will use inheritance to solve this, it is just for making this section lighter and focus on the Builder Pattern).

## Chapter 4: Could you please go talk to him?
Okey, we have fruits an obstacles, but when we execute the game they are just simple cells, and their counter decreases so that they end up dissappearing. Maybe that behaviour is interesting for the fruits, but not for the obstacles. It seems obvious that the game is asking for different kind of cells, isn't it?

So we are creating classes for `SnakeCell`, `EmptyCell`, `FruitCell`, and `ObstacleCell`, all of them inherits from the base `Cell` class. By now, the only difference with the parent class would be at `ObstacleCell`, whose counter never decreases.
````
class SnakeCell extends Cell { }
class FruitCell extends Cell { }
class EmptyCell extends Cell { 
    constructor() {
        super(0);
    }
    tick() { }
}
class ObstacleCell extends Cell {
    constructor() {
        super(0);
    }
    tick() { }
}
````

> Creating a child class that does exactly the same thing that the parent class seems absurd, but we are going to need it soon, be pacient.

We are going to change the Builder class, so that it builds the correct instances instead of simple cells. Is it working? Of course not, where are the obstacles and fruits? We have to feed them separately!

The next step would be paint them differently so the player can see them, and the paint process is done in the BoardView.jsx class. How could we achieve that? Well, an if-else chaing can save the situation like this:
````
var cellView = undefined;
if ( cell instanceof SnakeCell )
  cellView = $OUR_SNAKE_CELL_VIEW;
else if ( cell instanceof EmptyCell )
  cellView = $OUR_EMPTY_CELL_VIEW;
//and so on...
````

But this solution is pretty ugly, and not so efficient. The same if-else would have to be repeated if we wanted to add another kind of view, like a Mobile or Native view. How can we do that? Well, let's first analyze our problem: we have two parts, the model and the view, and there is a conceptual relation between a unit of the model and a unit of the view (`SnakeCell` and `$OUR_SNAKE_CELL_VIEW`), but they can't mix them, and we want to build a flexible solution that avoids `if-else` stuff.

### The Adapter Pattern
Whenever two entities have a conceptual relation or need of communication, the Adapter Design Pattern advises us to use an intermediate object that translates one to the other so that they can communicate and understand each other. Words like _relation_ and _understand each other_ sounds very beautiful, but what does it mean in terms of coding?

It means that if we have two objects that are related and make calls to each other, we can encapsulate their entry points in an `Adapter` object to whom both make calls to, and the `Adapter` object will perform the appropiate call to the addressee. At the end, it is some kind of translator.

Why should I use it? Well, when I wanted to change the object I want to communicate to, instead of changing all the calls I make to it so that they adapt to the new object, I can just change the `Adapter` :)

### Implementation
In our solution, what we need is to translate Model instances into View instances. Our adapter logic will be at the View part, and will be called `ViewAdapter.jsx`. The `BoardView.jsx` will have a `viewAdapter` property, and when it wanted to paint a cell, it will pass the adapter to the cell, so that the cell tells the adapter which method it has to call in order to create its corresponding View. It may be difficult to understand by just reading, don't worry. Let's clarify the concept with a diagram.

<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/7-Adapter.png"/>
</p>

To sum up, when `BoardView` wants to paint a cell, instead of asking which kind of cell is it dealing with, it will ask the cell to tell the adapter who it is. For that, it passes the `viewAdapter` to the `paint` method of the cell, so that the cell is responsible for calling the corresponding method of the adapter.

## Chapter 5: Not all the heroes wear a coat
We are doing pretty well, after writting some lines of code we have a game prototype, but it is still not functional because of minor logic bugs that are not so very related with design. However, even in this "minor-logic" stuff, _Design Patterns_ book can help us.

### Part 1: No excuses, just tell me yes or not.
Now we have a problem, the Snake has an infinite length! We have to tell the `Board` that it must substitute a cell by an `EmptyCell` when its counter reachs 0. But this should only be applied for Snakes and Fruits, isn't it? So how do we differenciate between those two and the obstacles? Shall we use an infinite counter? Could be keep the `ObstacleCell` counter from decreasing? Or maybe use an `if-else` when the `Board` tries to substitute one Cell by an `EmptyCell` so that it checks that it is not an `ObstacleCell`.

All the previous solutions are valid, and solve our problem, but after reading the _Design Patterns_ book, a powerful sense of delegating and avoiding explicit logic (`if-else` and `switch` stuff) as much as possible arises. Following that sense, I concluded that a better solution applying the concepts of the book will be this one:

The `Cell` parent class will have a `shouldSubstitute` method, and each child will override its method based on its particular condition. The Board will ask `shouldSubstitute` instead of asking for the counter. This way we gain a lot of flexibility, so we can include new objects and dealign with its temporal condition by just overriding this method. Does it work? Yes! Our Snake has a finite length! Also, fruits are disappearing, while obstacles are not.

### Part 2: Fix your problems you two alone
The other problem is that the Snake is not colliding with the objects nor eating. `Board` class should handle this, as we declared it as our _Mediator_ between both classes, concretely in the methot that moves the Snake, `setSnakePosition`.

This method calls to `checkCollision`, but it only checks if the new position is out of bounds. Now what we are going to check if it the Cell is a Fruit or an Obstacle, and depending on what it is, it should behave hiting or eating. Therefore, could be `Board` class check what kind of cell is the one at the new position and make the snake move, eat or hit depending on it? Well, of course it can, but the _delegating and avoiding explicit logic sense_ does not allow me to do it. How can we do it following the _Design Patterns_ book principles?

Cell parent class will have a method called `collide`, that will receive the Snake and will tell it what operation has to do. `ObstacleCell` will override this method telling the Snake that it is a `hit()`, while `FruitCell` will tell it to `eat()`. `Board` class will just check that the Snake is not out of bounds, and then connect the cell and the Snake.

Hooray! Our Snake Game is functional!

<p align="center">
  <img src="https://github.com/baez97/design-patterns-snake/blob/master/images/8-Prototype.gif"/>
</p>

## Chapter 6: Killing flies with tanks
Design Patterns are great practices that help us designing a flexible, decoupled and reusable solution, but they are not universally the best option for everything, they have some disadvantages:
* The number of classes increases in your solution.
* The logic is more distributed, and so, may be more difficult to follow for a programmer that knows nothing about Design Patterns.
* You invest an extra effort for flexibility, but you may never need that flexibility.
For these reasons, you should not use them whenever you identify something related a Design Pattern you already know. Just use them when it is worth.

For example, if in our Snake Game we wanted to add a "Pause" button, we can think about applying an State pattern. For that we would create a `GameState` parent class and `Playing` and `Paused` child classes. Each one would have a `tick` method that the Board will call, and the state object will change when the `Pause` button is pressed.

We are creating 3 classes, distributing the logic of a functionality in two parts. Of course, we gain flexibility, but do we really need it? Is there any other state for a game that is not "Paused" and "Playing", why don't we use a simple boolean variable like `pause` and check it before calling to the `tick()` method?
* It is much more simple.
* It is much easier to read.
* We don't really need more flexibility.

### Implementation
A new paused attribute is added to the `GameView` class, and will be passed to the `BoardView` so that the operation defined for the interval does not perform the `tick` unless the Game is not paused. A button is also added to `GameView`, that simply toggles the value of the `paused` variable.

> For the pause funcionality we have to choose between delegate the logic to the View or to the Game, there is not a better choice. For me, pausing this game is a View business, as we are dealing with the `tick` interval from it.

## Conclusion
With this article we have learned a little bit about some Design Patterns and how to apply them, but in the last two chapters something changed... There were no Design Patterns! The main purpose of this article was to give an introduction to DP, but also to this _highly decoupled_ and _no-explicit-logic_ way of programming so that we do not have to memorize all the Design Patterns, their advantages and usages.

Of course, reading about all of them will for sure increase your powers, but there are so many topics to read about in Software Engineering that sometimes we need a brief introduction like this article so we can decide if we want to get deeper or just have a basic notion about it.

Thank you so much for reading this article, and please feel free to fork and make contributions. It's a pleasure for me to share this with you :)

Special thanks to @jgallud, my Design Patterns teacher who inspired me so heavily that I couldn't avoid to make an article about it.