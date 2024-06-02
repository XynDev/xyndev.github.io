const person1Input = document.getElementById('person1');
        const person2Input = document.getElementById('person2');
        const shipButton = document.getElementById('ship');
        const outputDiv = document.getElementById('output');

        const lowChanceNames = ["Damien", "Joe", "Jenny"];
        const pickupLines = [
            "Are you a magician? Because whenever I look at you, everyone else disappears.",
            "Do you have a map? Because I keep getting lost in your eyes.",
            "Is your name Google? Because you have everything I’ve been searching for.",
            "Are you a camera? Because every time I look at you, I smile.",
            "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
            "If you were a vegetable, you’d be a cute-cumber.",
            "Do you have a sunburn, or are you always this hot?",
            "Can I follow you home? Cause my parents always told me to follow my dreams.",
            "If you were a fruit, you’d be a fineapple."
        ];

        shipButton.addEventListener('click', () => {
            const person1 = person1Input.value.trim();
            const person2 = person2Input.value.trim();
        
            if (person1 && person2) {
                const response = generateResponse(person1, person2);
                const lovePercentage = generateLovePercentage(person1, person2);
                const pickupLine = generatePickupLine();
        
                if (lovePercentage < 10) {
                    outputDiv.innerHTML = `<p>${generateBadResponse(person1, person2)}</p><p>Love Percentage: ${lovePercentage}%</p>`;
                } else {
                    outputDiv.innerHTML = `<p>${response}</p><p>Love Percentage: ${lovePercentage}%</p><p>Pickup Line: ${pickupLine}</p>`;
                }
            } else {
                outputDiv.textContent = 'Please enter both names.';
            }
        });;

        function generateResponse(person1, person2) {
            const responses = [
                `Aww, ${person1} and ${person2} make such a cute couple! Their love is like a beautiful rose, blooming with passion and tenderness.`,
                `${person1} and ${person2}'s love story is straight out of a fairytale! Their bond is unbreakable, and their hearts beat as one.`,
                `The way ${person1} looks at ${person2} melts my heart! Their love is pure, genuine, and everlasting.`,
                `${person1} and ${person2} are soulmates, destined to be together forever. Their love is a rare and precious gem, shining brightly in this world.`,
                `When ${person1} and ${person2} are together, the world around them seems to fade away. Their love is a magical force that transcends time and space.`,
                `The chemistry between ${person1} and ${person2} is undeniable! Their love is a beautiful symphony, playing the sweetest melodies.`,
                `${person1} and ${person2}'s love is like a warm embrace on a cold winter day, comforting and reassuring.`,
                `The way ${person1} and ${person2} look into each other's eyes speaks volumes about their deep connection and unwavering love.`,
                `${person1} and ${person2}'s love is a masterpiece, painted with the most vibrant colors of passion, trust, and devotion.`,
                `The love between ${person1} and ${person2} is a beacon of hope, reminding us that true love does exist in this world.`,
                `${person1} and ${person2} are two halves of a whole, perfectly complementing each other in every way.`,
                `The love shared by ${person1} and ${person2} is a precious gift, cherished and nurtured with every passing day.`,
                `${person1} and ${person2}'s love is a beautiful dance, gracefully moving in sync with each other's hearts.`,
                `The way ${person1} and ${person2} support and uplift each other is a testament to the strength of their love.`,
                `${person1} and ${person2}'s love is a safe haven, a place where they can be their true selves without fear or judgment.`,
                `The love between ${person1} and ${person2} is a work of art, crafted with patience, understanding, and unconditional acceptance.`,
                `${person1} and ${person2}'s love is a guiding light, illuminating their path through life's challenges and triumphs.`,
                `The bond between ${person1} and ${person2} is unbreakable, forged by the fires of trust, respect, and unwavering commitment.`,
                `${person1} and ${person2}'s love is a beautiful melody, harmonizing perfectly and filling the air with joy.`,
                `The way ${person1} and ${person2} love and cherish each other is an inspiration to us all.`,
                `${person1} and ${person2}'s love is a precious treasure, to be guarded and nurtured for eternity.`,
                `The spark between ${person1} and ${person2} could light up the darkest night.`,
                `True love is written in the stars, and ${person1} and ${person2} were destined to find each other.`,
                `${person1} and ${person2} have a love that's timeless, enduring, and ever so sweet.`,
                `${person1} and ${person2}'s love blossoms like the flowers in spring, full of life and color.`,
                `In the story of life, ${person1} and ${person2} share the most beautiful chapter.`,
                `${person1} and ${person2} are each other's best friend, lover, and confidant.`,
                `Every moment spent with ${person1} and ${person2} is a treasure that shines brightly.`,
                `${person1} and ${person2}'s love is a gentle breeze on a warm summer day, refreshing and pure.`,
                `${person1} and ${person2} are like peanut butter and jelly, a perfect match.`,
                `The love of ${person1} and ${person2} is a glowing ember, warm and steadfast.`,
                `${person1} and ${person2}'s love is a journey, beautifully unfolding with each step.`,
                `Love is a song, and ${person1} and ${person2} sing it in perfect harmony.`,
                `The connection between ${person1} and ${person2} is electric, sparking joy in everyone around them.`,
                `${person1} and ${person2} are the epitome of couple goals, showing us all what true love looks like.`,
                `${person1} and ${person2}'s love is like a lighthouse, guiding them through the storm.`,
                `${person1} and ${person2} are meant to be, their hearts beating as one.`,
                `${person1} and ${person2}'s love is like a fine wine, growing richer and more flavorful with time.`,
                `With ${person1} and ${person2}, love always wins, conquering all obstacles.`,
                `${person1} and ${person2}'s love is a fairy tale come true, filled with magic and wonder.`,
                `Together, ${person1} and ${person2} create a love story that's unforgettable.`,
                `The love between ${person1} and ${person2} is a force of nature, powerful and unstoppable.`,
                `${person1} and ${person2} share a love that's rare and precious, a true gift.`,
                `${person1} and ${person2} are like two puzzle pieces, fitting perfectly together.`,
                `In the garden of love, ${person1} and ${person2} are the most beautiful flowers.`,
                `${person1} and ${person2}'s love is an adventure, filled with excitement and joy.`,
                `The bond between ${person1} and ${person2} is like no other, unique and special.`,
                `${person1} and ${person2}'s love is like a beacon, shining brightly in the dark.`,
                `${person1} and ${person2} are like two stars, shining brightly in each other's skies.`,
                `The way ${person1} and ${person2} love each other is an inspiration to everyone around them.`,
                `${person1} and ${person2} are like a lock and key, perfectly matched.`,
                `With ${person1} and ${person2}, every day is a celebration of love.`,
                `${person1} and ${person2}'s love is like a warm blanket on a cold day, comforting and cozy.`,
                `The connection between ${person1} and ${person2} is like a beautiful symphony, harmonious and lovely.`,
                `Together, ${person1} and ${person2} make the world a better place with their love.`,
                `${person1} and ${person2}'s love is like a spark, igniting happiness in everyone around them.`,
                `The love story of ${person1} and ${person2} is one for the ages, timeless and true.`,
                `${person1} and ${person2}'s love is a treasure, to be cherished and protected.`,
                `${person1} and ${person2} are like two halves of a whole, completing each other perfectly.`,
                `${person1} and ${person2} share a love that's unbreakable, strong and true.`,
                `The love between ${person1} and ${person2} is a beautiful gift, to be celebrated every day.`,
                `${person1} and ${person2}'s love is like a shining star, bright and eternal.`,
                `${person1} and ${person2} are like two peas in a pod, perfectly matched and inseparable.`,
                `Together, ${person1} and ${person2} create a love that's pure and beautiful.`,
                `${person1} and ${person2}'s love is a force to be reckoned with, powerful and enduring.`,
                `The way ${person1} and ${person2} love each other is a beautiful example for us all.`,
                `${person1} and ${person2} are like the moon and stars, meant to be together.`,
                `${person1} and ${person2}'s love is like a beautiful painting, full of color and life.`,
                `${person1} and ${person2} are like a beautiful melody, harmonizing perfectly.`,
                `${person1} and ${person2}'s love is like a river, flowing smoothly and endlessly.`,
                `The love between ${person1} and ${person2} is a beautiful adventure, filled with joy and excitement.`,
                `${person1} and ${person2} are like two birds, flying together in perfect harmony.`,
                `${person1} and ${person2}'s love is a beautiful journey, unfolding with each passing day.`,
                `Together, ${person1} and ${person2} create a love that's timeless and true.`,
                `The bond between ${person1} and ${person2} is strong and unbreakable, a true testament to their love.`,
                `The love story of ${person1} and ${person2} is a beautiful masterpiece, crafted with care and devotion.`,
                `${person1} and ${person2} are like two stars in the sky, shining brightly together.`,
                `The way ${person1} and ${person2} look at each other is a beautiful sight to behold.`,
                `${person1} and ${person2} share a love that's pure and beautiful, a true gift.`,
                `Together, ${person1} and ${person2} make the world a better place with their love.`,
                `${person1} and ${person2}'s love is a beautiful symphony, harmonizing perfectly.`,
                `${person1} and ${person2} are like two halves of a whole, perfectly matched.`,
                `${person1} and ${person2} share a love that's unbreakable, strong and true.`,
                `The love between ${person1} and ${person2} is a beautiful gift, to be celebrated every day.`,
                `${person1} and ${person2}'s love is like a shining star, bright and eternal.`,
                `${person1} and ${person2} are like two peas in a pod, perfectly matched and inseparable.`,
                `Together, ${person1} and ${person2} create a love that's pure and beautiful.`,
                `${person1} and ${person2}'s love is a force to be reckoned with, powerful and enduring.`,
                `The way ${person1} and ${person2} love each other is a beautiful example for us all.`,
                `${person1} and ${person2} are like the moon and stars, meant to be together.`,
                `${person1} and ${person2}'s love is like a beautiful painting, full of color and life.`,
                `${person1} and ${person2} are like a beautiful melody, harmonizing perfectly.`,
                `${person1} and ${person2}'s love is like a river, flowing smoothly and endlessly.`,
                `The love between ${person1} and ${person2} is a beautiful adventure, filled with joy and excitement.`,
                `${person1} and ${person2} are like two birds, flying together in perfect harmony.`,
                `${person1} and ${person2}'s love is a beautiful journey, unfolding with each passing day.`,
                `Together, ${person1} and ${person2} create a love that's timeless and true.`,
                `The bond between ${person1} and ${person2} is strong and unbreakable, a true testament to their love.`,
                `The love story of ${person1} and ${person2} is a beautiful masterpiece, crafted with care and devotion.`,
                `${person1} and ${person2} are like two stars in the sky, shining brightly together.`,
                `The way ${person1} and ${person2} look at each other is a beautiful sight to behold.`,
                `${person1} and ${person2} share a love that's pure and beautiful, a true gift.`,
                `Together, ${person1} and ${person2} make the world a better place with their love.`,
                `${person1} and ${person2}'s love is a beautiful symphony, harmonizing perfectly.`
            ];

            const randomIndex = Math.floor(Math.random() * responses.length);
            return responses[randomIndex];
        }

        function generateLovePercentage(person1, person2) {  

            const random = Math.floor(Math.random() * 100);
            if (random < 60) {

                if (random < 30) {
                    return random + 60;
                }

                return random + 30;
            } else {
                return random;
            }
            
        }

        function generatePickupLine() {
            const randomIndex = Math.floor(Math.random() * pickupLines.length);
            return pickupLines[randomIndex];
        }

        function generateBadResponse(person1, person2) {
            const badResponses = [
                `Sorry, but ${person1} and ${person2} just don't seem to fit together. Their love compatibility is low.`,
                `I don't see much chemistry between ${person1} and ${person2}. They might be better off as friends.`,
                `${person1} and ${person2} have very different personalities and interests. Their relationship might be a struggle.`,
                `The love between ${person1} and ${person2} is lacking passion and spark. They might not be a good match.`,
                `I'm not feeling the love connection between ${person1} and ${person2}. Their relationship might be rocky.`,
                `Unfortunately, ${person1} and ${person2} don't seem to have a strong romantic connection.`,
                `It seems like ${person1} and ${person2} are better suited as friends rather than romantic partners.`,
                `Based on their names, ${person1} and ${person2} might face challenges in their relationship.`,
                `The compatibility between ${person1} and ${person2} appears to be lower than average.`,
                `There's a lack of chemistry between ${person1} and ${person2}. Their relationship may not flourish.`,
                `The relationship potential between ${person1} and ${person2} seems limited.`,
                `Unfortunately, ${person1} and ${person2} don't seem to have a strong romantic bond.`,
                `Based on their names, ${person1} and ${person2} may struggle to find common ground in their relationship.`,
                `It's unclear if ${person1} and ${person2} share a deep emotional connection.`,
                `The romantic compatibility between ${person1} and ${person2} appears to be minimal.`,
                `${person1} and ${person2} may face challenges in building a strong, lasting relationship.`,
                `There's little indication that ${person1} and ${person2} have a strong romantic spark.`,
                `It seems unlikely that ${person1} and ${person2} will develop a deep, meaningful connection.`,
                `Unfortunately, ${person1} and ${person2} don't seem to have the makings of a lasting romance.`,
                `The relationship potential between ${person1} and ${person2} is uncertain at best.`,
                `Based on their names, ${person1} and ${person2} may struggle to find compatibility in their relationship.`,
                `It's unclear if ${person1} and ${person2} share similar values and goals in life.`,
                `The romantic prospects for ${person1} and ${person2} are uncertain.`,
                `${person1} and ${person2} may need to work harder to establish a strong romantic connection.`,
                `The chances of a successful romance between ${person1} and ${person2} seem slim.`,
                `Unfortunately, ${person1} and ${person2} may not have the chemistry needed for a successful relationship.`,
                `Based on their names, ${person1} and ${person2} may face compatibility issues.`,
                `It's unclear if ${person1} and ${person2} have enough in common to sustain a long-term relationship.`,
                `The romantic compatibility between ${person1} and ${person2} is uncertain.`,
                `${person1} and ${person2} may need to explore their compatibility further before committing to a relationship.`,
                `The potential for a romantic connection between ${person1} and ${person2} is uncertain.`,
                `Unfortunately, ${person1} and ${person2} may not be well-suited for a romantic relationship.`,
                `Based on their names, ${person1} and ${person2} may struggle to find harmony in their relationship.`,
                `It's unclear if ${person1} and ${person2} have the emotional compatibility needed for a successful romance.`,
                `The chances of ${person1} and ${person2} developing a deep, meaningful connection seem slim.`,
                `${person1} and ${person2} may need to reconsider their compatibility before pursuing a romantic relationship.`,
                `The romantic potential between ${person1} and ${person2} is uncertain.`,
                `${person1} and ${person2} may need to work through their differences before their relationship can flourish.`,
                `Unfortunately, ${person1} and ${person2} may not have the foundation for a successful romance.`,
                `Based on their names, ${person1} and ${person2} may face challenges in building a strong relationship.`,
                `It's unclear if ${person1} and ${person2} are compatible enough to sustain a lasting romance.`,
                `The romantic chemistry between ${person1} and ${person2} is uncertain.`,
                `${person1} and ${person2} may need to reassess their compatibility before pursuing a serious relationship.`,
                `The likelihood of ${person1} and ${person2} forming a strong romantic bond seems low.`,
                `Unfortunately, ${person1} and ${person2} may not be well-matched for a romantic partnership.`,
                `Based on their names, ${person1} and ${person2} may struggle to find common ground in their relationship.`,
                `It's unclear if ${person1} and ${person2} share enough interests and values to sustain a long-term romance.`,
                `The potential for ${person1} and ${person2} to develop a successful relationship is uncertain.`,
                `${person1} and ${person2} may need to explore their compatibility further before committing to a romantic partnership.`,
                `The likelihood of ${person1} and ${person2} forming a deep, lasting connection seems low.`,
                `Unfortunately, ${person1} and ${person2} may not have the compatibility needed for a successful romance.`,
                `Based on their names, ${person1} and ${person2} may encounter difficulties in their relationship.`,
                `It's unclear if ${person1} and ${person2} have enough in common to sustain a meaningful romance.`,
                `The chances of ${person1} and ${person2} building a strong, lasting relationship seem slim.`,
                `${person1} and ${person2} may need to reconsider their compatibility before pursuing a serious commitment.`,
                `The romantic potential between ${person1} and ${person2} appears to be limited.`,
                `${person1} and ${person2} may need to address any compatibility issues before moving forward with their relationship.`,
                `Unfortunately, ${person1} and ${person2} may not be well-suited for a romantic partnership.`,
                `Based on their names, ${person1} and ${person2} may face challenges in building a solid foundation for their relationship.`,
                `It's unclear if ${person1} and ${person2} have the emotional connection needed for a successful romance.`,
                `The likelihood of ${person1} and ${person2} forming a lasting bond seems low.`,
                `Unfortunately, ${person1} and ${person2} may not have the chemistry needed for a successful romance.`,
                `Based on their names, ${person1} and ${person2} may struggle to find compatibility in their relationship.`,
            ];
            const randomIndex = Math.floor(Math.random() * badResponses.length);
            return badResponses[randomIndex];
        }
