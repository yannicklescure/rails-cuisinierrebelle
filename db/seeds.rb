puts 'cleaning database...'
User.destroy_all
Recipe.destroy_all

first_name = 'Yannick'
last_name = 'Lescure'
User.create!([
  {
    first_name: first_name,
    last_name: last_name,
    name: "#{first_name} #{last_name}",
    email: 'yannick.lescure@gmail.com',
    password: '123456'
  }
])

user_one = User.find_by(email: 'yannick.lescure@gmail.com')

recipe = Recipe.create!([
  {
    title: "Pain rapide, cuisson à la poêle",
    subtitle: "Recette à partir de bicarbonate de soude",
    video: "https://youtu.be/d7SIQcNk3Wo",
    direction: "Quantités pour 4 petits pains\r\n\r\nFarine de blé 1 1/2 tasse / 225 g\r\nSel 1/4 cuillère à café / 1 g\r\nLevure chimique (bicarbonate de soude) 2 cuillère à café / 5 g\r\nLait 1/2 tasse / 120 g", direction: "Dans un grand bol, mélanger tous les ingrédients secs.\r\nAjouter le lait.\r\nÀ l'aide d'une fourchette (ou autre), mélanger le tout jusqu'à obtention d'une «boule».\r\nPétrissez votre pâte 2 à 3 minutes, en commençant dans votre bol puis en continuant sur votre plan de travail.\r\nCoupez votre pâte en 4 morceaux égaux et formez 4 boules.\r\nAplatissez chacune des boules jusque obtenir une épaisseur de 1 cm.\r\nÀ l'aide d'une pinceau, badigeonnez d'huile végétale la surface qui sera en contact avec votre poêle.\r\nPlacez vos pains dans une poêle préchauffée sur un feu moyen.\r\nBadigeonnez d'huile végétale la surface apparente et couvrez votre poêle d'un couvercle et laissez cuire vos pains pendant 10 minutes.\r\nTournez vos pains et laissez continuer de cuire pendant 7 à 8 minutes.\r\nSortez vos pains, déposez-les sur une grille et laissez-les refroidir 2 à 3 minutes avant de les manger.",
    description: "Une recette originale pour des petits pains rapides et tout chaud",
    image: 'https://media.cuisinierrebelle.com/20190904_084514.jpg',
    remote_photo_url: 'https://media.cuisinierrebelle.com/20190904_084514.jpg',
    user: user_one
  }
])

puts 'finished!'
