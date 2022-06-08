export const atos = (array) => {
    var newarray = [];
    try {
      for (var i = 0; i < array.length; i++) {
        newarray.push(String.fromCharCode(array[i]));
      }
    } catch (e) { }

    return newarray.join('');
  }