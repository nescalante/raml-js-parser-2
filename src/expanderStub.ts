import ex=require ("./raml1/ast.core/expanderLL");


export function expandTraitsAndResourceTypes<T>(api:T):T {
    return ex.expandTraitsAndResourceTypes(api);
}
