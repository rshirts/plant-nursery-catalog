Create Table products(id int NOT NULL AUTO_INCREMENT, productName char(25), name char(25), image char(25), height char(25), width char(25), sun char(25), soil char(25), water char(25), spacing char(25), descr char(25), PRIMARY KEY(id));
Insert into products(productName, name, image, height, width, sun, soil, water, spacing, descr) Values
(                   'grounds',   'Name', 'Photo',   NULL, 'Width', 'Sun', 'Soil', 'Water',    NULL, 'Description'),
(                   'trees',     'Name', 'Photo', 'Height', 'Width', 'Sun', 'Soil',  NULL,    NULL, 'Description'),
(                   'shrubs',    'Name', 'Photo', 'Height', 'Width', 'Sun', 'Soil',  NULL, 'Spacing', 'Description');

Create Table grounds(id int NOT NULL AUTO_INCREMENT, name char(50), image text(2083), width char(20), sun char(10), soil char(10), water char(10), descr char(255), PRIMARY KEY (id));
Insert into grounds (name, image, width, sun, soil, water, descr) Values
('Ajuga', 'img/Ajuga.jpg', '24 inches', 'Full Sun', 'clay', 'wet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor ultricies risus, eu faucibus orci porta sed. Fusce eget mauris libero. Duis et quam eget est interdum accumsan sit amet nec augue.'),
('Bishop\'s weed', 'img/Bishop.jpg', '20 inches', 'Part Sun', 'silt', 'dry', 'Duis auctor ultricies risus, eu faucibus orci porta sed. Fusce eget mauris libero. Duis et quam eget est interdum accumsan sit amet nec augue. Mauris elementum nibh mi, ut mollis lacus feugiat non.'),
('Brass Buttons', 'img/BrassButtons.jpg', '36 inches', 'Full Shade', 'clay', 'wet', 'Fusce eget mauris libero. Duis et quam eget est interdum accumsan sit amet nec augue. Mauris elementum nibh mi, ut mollis lacus feugiat non.'),
('Hens and Chicks', 'img/HenChick.jpg', '32 inches', 'Full Sun', 'clay', 'wet', 'Duis et quam eget est interdum accumsan sit amet nec augue. Mauris elementum nibh mi, ut mollis lacus feugiat non. Quisque molestie orci eu nunc tempor, eu auctor neque iaculis.'),
('Lamb\'s Ears', 'img/LambEar.jpg', '18 inches', 'Part Sun', 'sandy', 'dry', 'Mauris elementum nibh mi, ut mollis lacus feugiat non. Quisque molestie orci eu nunc tempor, eu auctor neque iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus.'),
('Lamium', 'img/Lamium.jpg', '12 inches', 'Full Shade', 'silt', 'dry', 'Quisque molestie orci eu nunc tempor, eu auctor neque iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus.'),
('Mondo Grass', 'img/MondoGrass.jpg', '16 inches', 'Full Sun', 'clay', 'dry', ' Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'),
('Sedums', 'img/Sedums.jpg', '20 inches', 'Full Shade', 'clay', 'wet', 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus tincidunt nibh quis augue scelerisque volutpat.'),
('Sweet Woodruff', 'img/SwWoodruff.jpg', '24 inches', 'Part Sun', 'sandy', 'dry', 'Vivamus tincidunt nibh quis augue scelerisque volutpat. Mauris vestibulum mi ut hendrerit dignissim. Ut ut auctor sapien.'),
('Thyme', 'img/Thyme.jpg', '8 inches', 'Part Sun', 'silt', 'dry', 'Mauris vestibulum mi ut hendrerit dignissim. Ut ut auctor sapien. Mauris venenatis leo ut orci tristique, sit amet luctus dolor ultrices.');
Create Table trees(id int NOT NULL AUTO_INCREMENT, name char(50), image text(2083), height char(20), width char(20), sun char(10), soil char(10), descr char(255), PRIMARY KEY (id));
Insert into trees (name, image, height, width, sun, soil, descr) Values
('Austrian Pine', 'img/AustrianPine.jpg', '40 feet', '45 feet', 'Full Sun', 'sandy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum id velit id posuere. Nulla cursus bibendum odio, vitae dictum ante suscipit non.'),
('Baldcypress', 'img/Baldcypress.jpg', '30 feet', '35 feet', 'Full Sun', 'sandy', 'Phasellus bibendum quam eu nibh ornare, vitae posuere leo aliquet. Praesent cursus vestibulum risus a tincidunt.'),
('Black Locust', 'img/BlackLocust.jpg', '20 feet', '25 feet', 'Part Sun', 'clay', 'Praesent facilisis at ante ut scelerisque. Pellentesque tincidunt nunc sit amet velit pulvinar, ac molestie metus elementum. '),
('Black Oak', 'img/BlackOak.jpg', '10 feet', '10 feet', 'Full Sun', 'sandy', 'Sed vitae nisl eleifend, eleifend nisi eget, feugiat massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'),
('Black Walnut', 'img/BlackWalnut.jpg', '50 feet', '45 feet', 'Part Sun', 'sandy', 'Maecenas facilisis sem ipsum, sit amet dictum augue semper vitae. Vivamus nibh tellus, ornare placerat lorem dignissim, ultrices pharetra velit.'),
('Blue Spruce', 'img/BlueSpruce.jpg', '60 feet', '15 feet', 'Part Sun', 'clay', 'Aliquam et faucibus risus, vitae dictum quam. Etiam congue sit amet turpis sed tristique. Proin vitae commodo lectus, sed sodales ligula.'),
('Bur Oak', 'img/BurOak.jpg', '10 feet', '8 feet', 'Part Sun', 'clay', 'Aliquam interdum elementum tincidunt. In nulla arcu, ullamcorper quis enim eget, auctor condimentum turpis. Praesent in eleifend nisl. '),
('Bur Oak Mossycup Oak', 'img/MossyOak.jpg', '60 feet', '50 feet', 'Full Sun', 'sandy', 'Mauris pretium aliquet luctus. Etiam congue vitae tellus in pellentesque. Mauris ac mi ultrices, venenatis purus mattis, pharetra ante. '),
('Chestnut Oak', 'img/ChestnutOak.jpg', '50 feet', '45 feet', 'Part Sun', 'sandy', 'Fusce in sapien et velit blandit tincidunt.'),
('Chitalpa', 'img/Chitalpa.jpg', '40 feet', '45 feet', 'Full Sun', 'sandy', 'In maximus malesuada mollis. Duis commodo lorem at consequat cursus. Donec laoreet id nibh et consectetur. Maecenas quis leo justo. '),
('Common Hackberry', 'img/Hackberry.jpg', '30 feet', '25 feet', 'Full Shade', 'silt', 'Pellentesque pellentesque dolor a enim elementum pharetra. Pellentesque sodales mi in massa consectetur, sit amet maximus libero tincidunt.'),
('Corneliancherry Dogwood', 'img/CDogwood.jpg', '20 feet', '25 feet', 'Full Shade', 'sandy', 'Ut ultricies egestas est et hendrerit. Nam blandit dui quam. Sed malesuada ligula ut tincidunt dignissim. '),
('Cottonwoods and Poplars, including Aspen', 'img/CottonwoodPoplars.jpg', '10 feet', '10 feet', 'Full Shade', 'silt', 'Maecenas nisi velit, malesuada id massa ut, tincidunt aliquet leo. Morbi volutpat feugiat neque, rutrum dignissim tellus semper in.'),
('Crabapples', 'img/Crabapple.jpg', '20 feet', '25 feet', 'Full Sun', 'silt', 'Duis placerat arcu ac lectus auctor ultrices. Aenean ac risus lacinia, cursus mi eget, scelerisque risus. Quisque metus felis, fringilla ornare eleifend et, sollicitudin vitae urna.'),
('Eastern Redcedar', 'img/EastRedcedar.jpg', '30 feet', '35 feet', 'Full Sun', 'sandy', 'In congue ac nibh sit amet pretium. Ut sodales at erat in iaculis. Pellentesque nec dignissim massa. Ut quis arcu interdum, bibendum sapien id, eleifend sem. '),
('Eastern White Pine', 'img/EastWhitePine.jpg', '40 feet', '45 feet', 'Full Sun', 'silt', 'Pellentesque quis augue eu ligula auctor mollis a ut urna. Morbi pellentesque a ex ac suscipit. '),
('European Beech', 'img/EuroBeech.jpg', '50 feet', '45 feet', 'Full Sun', 'sandy', 'Nulla suscipit felis nulla, vitae efficitur nibh ultrices sit amet. Praesent ex eros, accumsan nec condimentum sit amet, interdum sit amet tortor.'),
('European Larch', 'img/EuroLarch.jpg', '60 feet', '55 feet', 'Part Sun', 'silt', 'Duis iaculis a augue et gravida. Pellentesque elementum suscipit venenatis. Maecenas efficitur odio et ante feugiat feugiat. Phasellus euismod laoreet dui, quis dapibus justo rutrum eu'),
('Flowering Cherry', 'img/FlowCherry.jpg', '70 feet', '55 feet', 'Full Sun', 'sandy', 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Interdum et malesuada fames ac ante ipsum primis in faucibus. '),
('Fringetree White Fringetree', 'img/Fringetree.jpg', '60 feet', '55 feet', 'Full Shade', 'silt', 'Suspendisse hendrerit sapien sit amet turpis rutrum finibus. Cras non tortor ac neque facilisis pellentesque ut at diam'),
('Giant Sequoia','img/GiantSeq.jpg', '50 feet', '45 feet', 'Full Sun', 'sandy', 'Vivamus auctor, leo sed molestie fermentum, massa magna fringilla nisi, ac tempor nibh felis at diam.'),
('Ginkgo','img/Ginkgo.jpg', '40 feet', '45 feet', 'Full Sun', 'sandy', 'Cras non tortor ac neque facilisis pellentesque ut at diam. Aenean placerat nisl a nisi suscipit mollis.'),
('Globe Willow','img/GlobeWillow.jpg', '30 feet', '35 feet', 'Part Sun', 'clay', 'Nunc suscipit lorem quis orci tristique, a lacinia nisi porta. Suspendisse potenti. Donec iaculis felis eget accumsan accumsan.'),
('Golden Raintree','img/GoldRaintree.jpg', '20 feet', '20 feet', 'Full Shade', 'sandy', 'Nunc non nunc sed dolor faucibus luctus vitae ut mi.'),
('Green Ash','img/GreenAsh.jpg', '10 feet', '10 feet', 'Part Sun', 'sandy', 'Aenean vehicula, erat vel aliquam elementum, massa massa malesuada quam, non pretium justo dui ut nibh. Suspendisse eu justo a lacus hendrerit hendrerit vitae dapibus ipsum.'),
('Hawthorns','img/Hawthorne.jpg', '20 feet', '15 feet', 'Part Sun', 'clay', 'Ut tristique congue pharetra. Donec arcu elit, scelerisque ut justo pharetra, mattis volutpat lectus.'),
('Honeylocust','img/Honeylocust.jpg', '30 feet', '35 feet', 'Full Shade', 'sandy', 'Aliquam varius vestibulum dui, eu iaculis velit. Mauris dictum molestie nibh id hendrerit. Curabitur fermentum vitae arcu a tincidunt.'),
('Incense-cedar','img/IncenseCedar.jpg', '40 feet', '35 feet', 'Full Shade', 'silt', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum id velit id posuere. Nulla cursus bibendum odio, vitae dictum ante suscipit non.'),
('Japanese Pagodatree','img/JapanPagoda.jpg', '50 feet', '55 feet', 'Full Shade', 'sandy', 'Phasellus bibendum quam eu nibh ornare, vitae posuere leo aliquet. Praesent cursus vestibulum risus a tincidunt.'),
('Japanese Tree Lilac','img/JapanLilac.jpg', '60 feet', '55 feet', 'Part Sun', 'clay', 'Praesent facilisis at ante ut scelerisque. Pellentesque tincidunt nunc sit amet velit pulvinar, ac molestie metus elementum. '),
('Japanese Zelkova','img/JapanZelkova.jpg', '70 feet', '20 feet', 'Part Sun','sandy', 'Suspendisse accumsan sem at nulla viverra condimentum sit amet non dolor. Nullam pharetra turpis nec nisi porta finibus.'),
('Junipers','img/Juniper.jpg', '10 feet', '8 feet', 'Full Sun','silt', 'Cras turpis sapien, molestie eget velit sit amet, tempor aliquet felis. Phasellus euismod nec sem vitae rhoncus.'),
('Kentucky Coffeetree','img/KYCoffee.jpg', '50 feet', '20 feet', 'Part Sun','silt', 'Etiam gravida fermentum nisi id ultrices. Praesent dapibus nisi nec nibh maximus, non vulputate libero pulvinar. Nam in commodo justo. '),
('Lacebark Elm','img/LacebarkElm.jpg', '40 feet', '35 feet', 'Full Sun','silt', 'Ut pellentesque quam et interdum bibendum. Fusce nec lacus ut augue porta congue. Integer elementum finibus nisi.'),
('Lacebark Pine','img/LacebarkPine.jpg', '30 feet', '20 feet', 'Full Shade','clay', 'Vivamus volutpat venenatis pulvinar. Integer tristique et mauris sed ullamcorper. Pellentesque molestie ipsum et malesuada suscipit.'),
('Littleleaf Linden','img/Littleleaf.jpg', '20 feet', '20 feet', 'Full Sun','clay', 'Pellentesque cursus leo orci, at gravida nibh tristique a. Aliquam erat volutpat. Nulla et augue aliquam, posuere elit ac, gravida lectus.'),
('London Planetree','img/London.jpg', '10 feet', '10 feet', 'Full Shade','silt', 'Ut ultrices metus lobortis tristique laoreet. Ut tempor, erat at consectetur tristique, dolor mi consequat mauris, sit amet tempus enim lectus a nisl'),
('Northern Red Oak','img/NorthRedOak.jpg', '20 feet', '10 feet', 'Full Shade','clay', 'Curabitur interdum elit in rhoncus dictum. Donec ac tellus in felis volutpat semper in consectetur ex. Aenean pellentesque interdum tincidunt.'),
('Norway Maple','img/Ajuga.jpg', '30 feet', '25 feet', 'Full Sun','silt', 'Vivamus sed placerat arcu, vel varius libero. Aenean non lectus at neque faucibus tempor. Pellentesque eu interdum metus.'),
('Ornamental Pear','img/OrnPear.jpg', '40 feet', '25 feet', 'Full Shade','clay', 'In hac habitasse platea dictumst. Aliquam velit lectus, vehicula nec sodales ut, viverra eget tellus. Integer id ornare ipsum.'),
('Paperbark Maple','img/Paperbark.jpg', '50 feet', '35 feet', 'Full Sun','silt', 'Nulla maximus urna id eros consectetur fringilla. Aliquam ultrices quam vitae dignissim euismod. Phasellus interdum semper gravida.'),
('Pitch Pine','img/PitchPine.jpg', '60 feet', '35 feet', 'Full Sun','clay', 'Donec id pellentesque est, sit amet eleifend justo. Ut laoreet, nisi a sollicitudin vulputate, nisi justo dictum ligula, sed elementum ligula felis ac tellus.'),
('Red Maple','img/RdMaple.jpg', '70 feet', '45 feet', 'Part Sun','silt', 'Phasellus blandit sem et enim malesuada bibendum. Nunc eget posuere metus. Integer elementum mi elit, in viverra eros tristique a. Etiam faucibus massa a fringilla varius'),
('Red Pine','img/RdPine.jpg', '60 feet', '45 feet', 'Full Sun','silt', 'Vivamus tortor dui, imperdiet vel felis quis, gravida bibendum tortor. Integer tincidunt felis lacus, vitae blandit nisi vestibulum sodales.'),
('Red Spruce','img/RdSpruce.jpg', '50 feet', '40 feet', 'Full Sun','clay', 'Donec condimentum urna enim, sed ultricies sapien feugiat ut. Nam facilisis ligula sed aliquet porttitor.'),
('Sassafras','img/Sassafrass.jpg', '40 feet', '30 feet', 'Full Sun','clay', 'Aenean nec mattis dui, sit amet maximus tortor. Nullam bibendum sem erat, quis gravida arcu posuere elementum.'),
('Scarlet Oak','img/ScarletOak.jpg', '30 feet', '25 feet', 'Full Sun','clay', 'Quisque porta, risus ut auctor blandit, ex lectus tempor ex, ac fermentum turpis leo nec sem. Nunc ut facilisis purus.'),
('Shadbush','img/Shadbrush.jpg', '20 feet', '10 feet', 'Full Sun','sandy', 'Nullam sodales a mauris vel mattis. Pellentesque consequat risus nec ultricies suscipit. In ultricies semper odio a egestas.'),
('Silver Maple','img/SilverMaple.jpg', '10 feet', '10 feet', 'Part Sun','silt', 'Curabitur lacinia orci ut tellus rutrum, ac sodales risus ultricies'),
('Sugar Maple','img/SugarMaple.jpg', '20 feet', '25 feet', 'Part Sun','sandy', 'Morbi euismod facilisis mauris, sed euismod odio porta in. Integer convallis, leo at pellentesque ornare, magna nunc fringilla augue, vel feugiat felis purus eget elit.'),
('Sycamore','img/Sycamore.jpg', '30 feet', '25 feet', 'Full Shade','sandy', 'Phasellus ultricies odio at mi hendrerit pharetra. Nam a congue enim, a lacinia elit. Nulla metus nulla, eleifend non efficitur et, vehicula vitae lorem. Vestibulum sed dui sagittis, dictum sem non, dignissim enim.'),
('The Oaks','img/Oaks.jpg', '40 feet', '15 feet', 'Full Sun','silt', 'Vestibulum mattis vel odio et pharetra. Curabitur eros nunc, ultrices ut lobortis ac, condimentum eget sem'),
('Tulip Tree','img/Tulip.jpg', '50 feet', '45 feet', 'Full Sun','silt', 'Suspendisse interdum nisl ut erat egestas sollicitudin. Phasellus facilisis vel odio ultrices finibus. Maecenas lobortis ornare gravida. Nam feugiat mollis lacinia.'),
('Turkish Filbert Turkish Hazel','img/Turkish.jpg', '60 feet', '45 feet', 'Full Shade','clay', 'Aliquam porta pulvinar nisl, non finibus risus sodales a. Suspendisse interdum nisl ut erat egestas sollicitudin.'),
('White Oak','img/WhiteOak.jpg', '70 feet', '50 feet', 'Full Sun','clay', 'Sed vitae nisl eleifend, eleifend nisi eget, feugiat massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'),
('White Spruce','img/WhiteSpruce.jpg', '60 feet', '50 feet', 'Part Sun','sandy', 'Maecenas facilisis sem ipsum, sit amet dictum augue semper vitae.'),
('Yellow-poplar Tulip tree Tulip-poplar','img/YellowPoplar.jpg', '50 feet', '55 feet', 'Part Sun','sandy', 'Aliquam et faucibus risus, vitae dictum quam'),
('Yellowwood','img/Yellowwood.jpg', '40 feet', '35 feet', 'Full Sun','clay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum id velit id posuere. Nulla cursus bibendum odio, vitae dictum ante suscipit non');
Create Table shrubs(id int NOT NULL AUTO_INCREMENT, name char(50), image text(2083), height char(20), width char(20), sun char(10), soil char(10), spacing char(10), descr char(255), PRIMARY KEY (id));
Insert into shrubs (name, image, height, width, sun, soil, spacing, descr) Values
('Allspice michelia', 'img/Allspice.jpg', '2 feet', '2 feet', 'Full Sun', 'Clay','24 inches', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum id velit id posuere. Nulla cursus bibendum odio, vitae dictum ante suscipit non.'),
('Arborvitae', 'img/Arborvitae.jpg', '4 feet', '6 feet', 'Full Shade', 'Silt', '36 inches', 'Praesent cursus vestibulum risus a tincidunt. Praesent facilisis at ante ut scelerisque. Pellentesque tincidunt nunc sit amet velit pulvinar, ac molestie metus elementum. '),
('Australia Tea Tree', 'img/AustraliaTT.jpg', '1 foot', '3 feet', 'Full Sun', 'Clay', '18 inches', 'Suspendisse accumsan sem at nulla viverra condimentum sit amet non dolor. Nullam pharetra turpis nec nisi porta finibus. Cras turpis sapien, molestie eget velit sit amet, tempor aliquet felis.'),
('Bamboo Palm', 'img/BambooPalm.jpg', '1 foot', '4 feet', 'Part Sun', 'Clay', '36 inches', ' Nullam pharetra turpis nec nisi porta finibus. Cras turpis sapien, molestie eget velit sit amet, tempor aliquet felis. Phasellus euismod nec sem vitae rhoncus.'),
('Barberry', 'img/Barberry.jpg', '5 feet', '8 feet', 'Full Sun', 'Sandy', '18 inches', 'Etiam gravida fermentum nisi id ultrices. Praesent dapibus nisi nec nibh maximus, non vulputate libero pulvinar. Nam in commodo justo. '),
('Bay', 'img/Bay.jpg', '1.5 feet', '4 feet', 'Full Shade', 'Silt', '18 inches', 'Ut pellentesque quam et interdum bibendum. Fusce nec lacus ut augue porta congue. Integer elementum finibus nisi. '),
('Bayberry', 'img/Bayberry.jpg', '4 feet', '6 feet', 'Part Sun', 'Clay', '18 inches','Vivamus volutpat venenatis pulvinar. Integer tristique et mauris sed ullamcorper. Pellentesque molestie ipsum et malesuada suscipit.'),
('Boxwood', 'img/Boxwood.jpg', '2 feet', '4 feet', 'Part Sun', 'Clay', '18 inches', 'Pellentesque cursus leo orci, at gravida nibh tristique a. Aliquam erat volutpat. Nulla et augue aliquam, posuere elit ac, gravida lectus.'),
('Buckthorn', 'img/Buckthorn.jpg', '2 feet', '5 feet', 'Full Sun', 'Sandy', '24 inches', 'Ut ultrices metus lobortis tristique laoreet. Ut tempor, erat at consectetur tristique, dolor mi consequat mauris, sit amet tempus enim lectus a nisl.'),
('California Bay Laurel', 'img/CaliBayLaurel.jpg', '1.5 feet', '5 feet', 'Full Shade', 'Silt', '12 inches', 'Donec ac tellus in felis volutpat semper in consectetur ex. Aenean pellentesque interdum tincidunt. Vivamus sed placerat arcu, vel varius libero. Aenean non lectus at neque faucibus tempor.'),
('Russian Arborvitae','img/Russian.jpg', '3 feet', '3 feet', 'Full Shade', 'Clay', '36 inches', 'Pellentesque eu interdum metus. In hac habitasse platea dictumst. Aliquam velit lectus, vehicula nec sodales ut, viverra eget tellus. Integer id ornare ipsum.'),
('Saybrook Juniper Tree', 'img/Saybrook.jpg', '2 feet', '3 feet', 'Full Sun', 'Clay', '12 inches', 'Nulla maximus urna id eros consectetur fringilla. Aliquam ultrices quam vitae dignissim euismod. Phasellus interdum semper gravida.'),
('Serviceberry Tree','img/Serviceberry.jpg', '1.5 feet', '4 feet', 'Full Sun', 'Clay', '12 inches', 'Donec id pellentesque est, sit amet eleifend justo. Ut laoreet, nisi a sollicitudin vulputate, nisi justo dictum ligula, sed elementum ligula felis ac tellus. '),
('Smoke Tree', 'img/SmokeTree.jpg', '5 feet', '1.5 feet', 'Full Sun', 'Sandy', '18 inches', 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'),
('Spirea', 'img/Spirea.jpg', '6 feet', '2 feet', 'Part Sun', 'Sandy', '36 inches', 'Phasellus blandit sem et enim malesuada bibendum. Nunc eget posuere metus. Integer elementum mi elit, in viverra eros tristique a. Etiam faucibus massa a fringilla varius.'),
('Spruce Tree', 'img/Spruce.jpg', '8 feet', '3 feet', 'Full Sun', 'Sandy', '24 inches', 'Vivamus tortor dui, imperdiet vel felis quis, gravida bibendum tortor. Integer tincidunt felis lacus, vitae blandit nisi vestibulum sodales.'),
('Sumac Plant', 'img/Sumac.jpg', '7 feet', '4 feet', 'Full Shade', 'Clay', '36 inches', 'Donec condimentum urna enim, sed ultricies sapien feugiat ut. Nam facilisis ligula sed aliquet porttitor.'),
('Summersweet Plant', 'img/Summersweet.jpg', '2 feet', '1.5 feet', 'Full Sun', 'Clay', '18 inches', ' Aenean nec mattis dui, sit amet maximus tortor. Nullam bibendum sem erat, quis gravida arcu posuere elementum.'),
('Tarragon', 'img/Tarragon.jpg', '1 foot', '3 feet', 'Part Sun', 'Sandy', '18 inches', 'Quisque porta, risus ut auctor blandit, ex lectus tempor ex, ac fermentum turpis leo nec sem. Nunc ut facilisis purus. Nullam sodales a mauris vel mattis. Pellentesque consequat risus nec ultricies suscipit.'),
('Willow Shrub', 'img/Willow.jpg', '.5 feet', '3 feet', 'Full Shade', 'Silt', '18 inches', 'In ultricies semper odio a egestas. Curabitur lacinia orci ut tellus rutrum, ac sodales risus ultricies. Morbi euismod facilisis mauris, sed euismod odio porta in.'),
('Wintergreen', 'img/Wintergreen.jpg', '6 feet', '5 feet', 'Full Sun', 'Silt', '36 inches', 'Integer convallis, leo at pellentesque ornare, magna nunc fringilla augue, vel feugiat felis purus eget elit. Vivamus eu odio arcu.'),
('Witch Hazel','img/WitchHazel.jpg', '3 feet', '4 feet', 'Full Shade', 'Clay', '24 inches', 'Sed vitae nisl eleifend, eleifend nisi eget, feugiat massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'),
('Yew Shrub', 'img/Yew.jpg', '4 feet', '6 feet', 'Part Sun', 'Clay', '24 inches', 'Maecenas facilisis sem ipsum, sit amet dictum augue semper vitae. Vivamus nibh tellus, ornare placerat lorem dignissim, ultrices pharetra velit.');