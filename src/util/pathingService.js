function getPath(pip, suit) {
   let map = {
      11: 'J',
      12: 'Q',
      13: 'K',
      14: 'A',
   };

   let fileName =
      pip < 11
         ? './images/card_sprites/' + pip.toString() + suit + '.png'
         : './images/card_sprites/' + map[pip] + suit + '.png';
   return fileName;
}

exports.getPath = getPath;
