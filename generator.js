

function* myGenerator () {
    yield true; 
    yield 42; 
    yield 'Hello';
    yield null;
    yield [1, 2, 3, 4];
    yield {name: 'Hello'}
}
    const genInstance = myGenerator();


    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());
    console.log(genInstance.next());

   

    genInstance().next();
