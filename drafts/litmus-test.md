<!-- # a litmus test for programming languages -->

outline

- guys ive come up with this test
	- why is it a litmus test
- this is what the test _is_
	- unassigned variable
- here's what the test means
	- design philosophy
- heres what this post is going to be
	- whirlwind tour!
- lets try a bunch of different languages
	- order...?

recently, i've come up with a kind of 'litmus test' for programming languages. it's a short, simple experiment that gives insight into the design philosophy behind a language. despite the name, it's not really a _test_ per se, as it doesn't have a 'pass' or 'fail' condition (though i'm willing to declare winners and losers). instead, it's more like an experiment that shows what a language values.

the litmus test is as follows:

> what happens when you try to use a variable that you've declared, but not assigned a value to?

even with such a basic task, the results we get are indicative of the language as a whole. with it, we get a simple way to test the values of a language, using fewer than 10 lines of code[1]!

[1] and if a language requires more than 10 lines of code for this test, that says a lot

note that in some languages, the only way to declare a variable _is_ to assign a value to it. this in of itself is a perfectly good result, but we'll continue further and test what happens if you use a variable that hasn't been declared yet—just for fun!

this post is going to be a whirlwind tour of various languages. for each one, we'll run our test, examine the results, then use them to analyze the language's design.

- opinionated

the best way to understand the test is to see it in action—so without further ado, let's jump right into it!

broadly speaking, there are two possible things this action could be: either it's valid, or it's invalid.

if it's valid, what behavior does the language choose?
if it's valid, what behavior does the language decide is appropriate?
if it's invalid, how does the language alert the programmer?

the chosen behavior is indicative of the values held by the language designers
indicates values of the language designers

note: talk about error messages

## outliers - DELETE ME
we'll start our tour with the exceptions. these languages fall into the category i mentioned earlier:

> in some languages, the only way to declare a variable _is_ to assign a value to it.

accordingly, we'll test these languages by attempting to use an undeclared variable.

whats interesting

- how it fails (error message, runtime/comptime)
- why are they this way

### Format

- intro to the language

```
code
```

- syntax
- first impressions

```terminal
output
```

- error
- analysis

### Python
we'll start with Python, since it has the shortest and simplest litmust test in this post: only one simple line of code!

```python
print(x)
```

this syntax probably looks familiar to most people with programming experience. it's super simple—and thats intentional! [The Zen of Python](https://en.wikipedia.org/wiki/Zen_of_Python) includes the following tenet:
> Simple is better than complex.

a notable absence from the code is any kind of declaration for `x`.

to the experienced Python developer, this anomaly appears ordinary, even natural. to an outside observer, however, this strange custom appears... limiting.

Python chooses to make assignment declaration because

- dynamic language
- https://peps.python.org/pep-0020/ OR `import this`
	- Simple is better than complex.

as expected, this code results in an error:

```terminal
Traceback (most recent call last):
  File "/Users/simonomi/Desktop/litmus/litmus.py", line 1, in <module>
    print(x)
          ^
NameError: name 'x' is not defined
```

the error we get is almost as simple

notably, this is a _runtime_ error because Python is an interpreted language

- what else would it be?

why are you this way

- interpreted
- simple!

### JavaScript

JavaScript is also an interpreted langauge, and if we do the same thing we did in Python...

```manual
<foreign-value>console<foreign-value>.<foreign-value>log<foreign-value>(<local-value>x<local-value>);
```

```terminal
/Users/simonomi/Desktop/litmus/litmus.js:1
console.log(x);
            ^

ReferenceError: x is not defined
    at Object.<anonymous> <grey>(/Users/simonomi/Desktop/litmus/<grey>litmus.js:1:13<grey>)
    at Module._compile (node:internal/modules/cjs/loader:1368:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1426:10)
    at Module.load (node:internal/modules/cjs/loader:1205:32)
    at Module._load (node:internal/modules/cjs/loader:1021:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:142:12)
    at node:internal/main/run_main_module:28:49<grey>
```

...we get the same result: a runtime error! this error is a bit wordier than Python's, but it gets the point across all the same.

however, *unlike* Python, in JavaScript, we can declare that a variable exists before we ever use it, as such:
```manual
<keyword>let<keyword> <value-declaration>x<value-declaration>;
<foreign-value>console<foreign-value>.<foreign-value>log<foreign-value>(<local-value>x<local-value>);
```

```terminal
<grey>undefined<grey>
```

- defaults to undefined
- makes sense, its an interpreted language

why are you the way you are

- interpreted

### Haskell

- compiled languages from here on out
- haskell has no way to declare a variable without using it (like python)

```manual
<value-declaration>main<value-declaration> = <foreign-value>putStrLn<foreign-value> x
```

- less familiar syntax
- main function
	- function definition syntax is so simple
- ML-style function calls (only non-c-style in this article)

why is declaration == assignment?

- functional
- equal means equal!!
	- "What are you, some kind of liar?" https://learnyouahaskell.com/introduction

```terminal
<B>litmus.hs:1:17:<B> <Bred>error<Bred><B>:<B> <B>[<B><Bred>GHC-88464<Bred><B>]
    Variable not in scope: x :: String<B>
  <Bblue>|<Bblue>
<Bblue>1 |<Bblue> main = putStrLn <Bred>x<Bred>
  <Bblue>|<Bblue>                 <Bred>^<Bred>
```

Haskell, being a compiled language, gives a compile-time error

- and a pretty good one too!
	- wellll, maybe not actually. "not in scope" is p vague
		- but how else would you say it?

completely reasonable and expected

### Swift


```swift
let x: Int
print(x)
```

- looks more like python and javascript than haskell
	- no main function
	- function call syntax
- `let x: Int` instead of `int x`
	- even primitives are capitalized
- x must have a type - show error without?

```terminal
litmus.swift:2:7: <Bred>error:<Bred> <B>constant 'x' used before being initialized<B>
<cyan>1 |<cyan> let x: Int
  <cyan>|<cyan>     `- <B>note: constant defined here<B>
<cyan>2 |<cyan> print(x)
  <cyan>|<cyan>       `- <Bred>error:<Bred> <B>constant 'x' used before being initialized<B>
<cyan>3 |<cyan> 
```

- correct
- flow analysis
- error message shows where x is defined

why are you the way you are

- safety!
- fancy compiler

### Rust

```manual
<keyword>fn<keyword> <value-declaration>main<value-declaration>() {
	<keyword>let<keyword> <value-declaration>x<value-declaration>: <foreign-type>i32<foreign-type>;
	<foreign-value>println!<foreign-value>(<string>"{x}"<string>);
}
```

- main function
- semicolons
- binding declaration similar to swift
- `println!` macro instead of `print`

```terminal
<Bred>error[E0381]<Bred><B>: used binding `x` isn't initialized<B>
 <Bblue>--><Bblue> litmus.rs:3:12
  <Bblue>|<Bblue>
<Bblue>2 |<Bblue>     let x: i32;
  <Bblue>|         - binding declared here but left uninitialized<Bblue>
<Bblue>3 |<Bblue>     println!("{x}");
  <Bblue>|<Bblue>               <Bred>^^^ `x` used here but it isn't initialized<Bred>
  <Bblue>|<Bblue>
  = <B>note<B>: this error originates in the macro `$crate::format_args_nl` which 
comes from the expansion of the macro `println` (in Nightly builds, run with
-Z macro-backtrace for more info)
<Bcyan>help<Bcyan>: consider assigning a value
  <Bblue>|<Bblue>
<Bblue>2 |<Bblue>     let x: i32 <green>= 42<green>;
  <Bblue>|<Bblue>                <green>++++<green>

<Bred>error<Bred><B>: aborting due to 1 previous error

For more information about this error, try `rustc --explain E0381`.<B>
```

- amazing compiler feedback
	- gives us the solution!!!!!

### Java/C#

```manual
<keyword>class<keyword> <type-declaration>Litmus<type-declaration> {
	<keyword>public<keyword> <keyword>static<keyword> <foreign-type>void<foreign-type> <value-declaration>main<value-declaration>(<foreign-type>String<foreign-type>[] args) {
		<foreign-type>int<foreign-type> <value-declaration>x<value-declaration>;
		<foreign-type>System<foreign-type>.<foreign-value>out<foreign-value>.<foreign-value>println<foreign-value>(<local-value>x<local-value>);
	}
}
```

- so much boilerplate
	- `System.out.println`
- `int x`
- semicolons

```terminal
litmus.java:4: error: variable x might not have been initialized
        System.out.println(x);
                           ^
1 error
error: compilation failed
```

- not the best error, but it's ok

```manual
<keyword>class<keyword> <type-declaration>Litmus<type-declaration> {
	<keyword>static<keyword> <foreign-type>int<foreign-type> <value-declaration>x<value-declaration>;

	<keyword>public<keyword> <keyword>static<keyword> <foreign-type>void<foreign-type> <value-declaration>main<value-declaration>(<foreign-type>String<foreign-type>[] args) {
		<foreign-type>System<foreign-type>.<foreign-value>out<foreign-value>.<foreign-value>println<foreign-value>(<local-value>x<local-value>);
	}
}
```

- moved x into a (static) property instead of a local variable

```terminal
0
```

- default value
- inconsistant!
	- error for variables, default value for properties
	- during writing, i was surprised

in fact, during writing, i was tripped up by this because i expected variables to have a default value

### Dart

```manual
<foreign-type>void<foreign-type> <value-declaration>main<value-declaration>() {
	<foreign-type>int<foreign-type> <value-declaration>x<value-declaration>;
	<foreign-value>print<foreign-value>(<local-value>x<local-value>);
}
```

- main function
- semicolons
- `void main`, `int x`
- `print`

```terminal
litmus.dart:3:8: <red>Error: Non-nullable variable 'x' must be assigned before it
can be used.<red>
    print(x);
          ^
```

- same as rust and swift
	- though the error message isnt as good
- nullable? whats that

```manual
<foreign-type>void<foreign-type> <value-declaration>main<value-declaration>() {
	<foreign-type>int?<foreign-type> <value-declaration>x<value-declaration>;
	<foreign-value>print<foreign-value>(<local-value>x<local-value>);
}
```

```terminal
null
```

- nullable types default to null
	- same as swift, actually!
- what about `var`?

```manual
<foreign-type>void<foreign-type> <value-declaration>main<value-declaration>() {
	<keyword>var<keyword> <value-declaration>x<value-declaration>;
	<foreign-value>print<foreign-value>(<local-value>x<local-value>);
}
```

```terminal
null
```

- var defaults to a nullable type??
	- `null` is `Null`
	- [weird subtyping shenanigans](https://dart.dev/null-safety/understanding-null-safety#nullability-in-the-type-system)

### Go

```manual
<keyword>package<keyword> main

<keyword>import<keyword> <string>"fmt"<string>

<keyword>func<keyword> <value-declaration>main<value-declaration>() {
    <keyword>var<keyword> <value-declaration>x<value-declaration> <foreign-type>int<foreign-type>
    fmt.<foreign-value>Println<foreign-value>(<local-value>x<local-value>)
}
```

```terminal
0
```

- defaults to 0
- go has a whole feature about this! (and it's horrifying)
	- `0`, `0.0`, `""`, `false`, `(0+0i)`, `nil`, etc.
	- anyone can create a zero-value!
	- [no good `Optional`](https://stackoverflow.com/questions/30731687/how-do-i-represent-an-optional-string-in-go) without a pointer

### C/C++

```manual
<preprocessor-directive>#import<preprocessor-directive> <string><stdio.h><string>

<foreign-type>int<foreign-type> <value-declaration>main<value-declaration>() {
	<foreign-type>int<foreign-type> <value-declaration>x<value-declaration>;
	<foreign-value>printf<foreign-value>(<string>"%d\n"<string>, <local-value>x<local-value>);
	<keyword>return<keyword> <number>0<number>;
}
```

- semicolons
- `int main`, `int x`
- printf - format string
- returns an int

why are you the way you are

- too old for flow analysis
- too low level for a default value

```terminal
8952720
```

- undefined behavior
- the worst possible thing you could do
