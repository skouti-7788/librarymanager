<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Livres;
use Faker\Factory as Faker;

class LivreSeeder extends Seeder
{
    public function run(): void
    {
    $faker = \Faker\Factory::create();
    
    // المصفوفة السابقة توضع هنا
   $realBooks = [
    // --- 10 الأولين ديالك (معدلين قليلاً للتناسق) ---
    ['title' => 'Les Misérables', 'author' => 'Victor Hugo', 'cat' => 'Classique', 'img' => 'https://covers.openlibrary.org/b/id/12838421-L.jpg'],
    ['title' => 'Start with Why', 'author' => 'Simon Sinek', 'cat' => 'Business', 'img' => 'https://covers.openlibrary.org/b/id/12061404-L.jpg'],
    ['title' => 'Le Mythe de Sisyphe', 'author' => 'Albert Camus', 'cat' => 'Philosophie', 'img' => 'https://covers.openlibrary.org/b/id/12711718-L.jpg'],
    ['title' => 'Grokking Algorithms', 'author' => 'Aditya Bhargava', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10531473-L.jpg'],
    ['title' => 'L\'Étranger', 'author' => 'Albert Camus', 'cat' => 'Roman', 'img' => 'https://covers.openlibrary.org/b/id/12711664-L.jpg'],
    ['title' => 'The 5 AM Club', 'author' => 'Robin Sharma', 'cat' => 'Productivité', 'img' => 'https://covers.openlibrary.org/b/id/12693988-L.jpg'],
    ['title' => 'Factfulness', 'author' => 'Hans Rosling', 'cat' => 'Science', 'img' => 'https://covers.openlibrary.org/b/id/12693972-L.jpg'],
    ['title' => 'Zero to One', 'author' => 'Peter Thiel', 'cat' => 'Entrepreneurship', 'img' => 'https://covers.openlibrary.org/b/id/12821616-L.jpg'],
    ['title' => 'La Nuit des temps', 'author' => 'René Barjavel', 'cat' => 'Science-Fiction', 'img' => 'https://covers.openlibrary.org/b/id/12843444-L.jpg'],
    ['title' => 'The Intelligent Investor', 'author' => 'Benjamin Graham', 'cat' => 'Finance', 'img' => 'https://covers.openlibrary.org/b/id/12821620-L.jpg'],

    // --- Business & Entrepreneurship (11-15) ---
    ['title' => 'The Lean Startup', 'author' => 'Eric Ries', 'cat' => 'Business', 'img' => 'https://covers.openlibrary.org/b/id/12534571-L.jpg'],
    ['title' => 'Atomic Habits', 'author' => 'James Clear', 'cat' => 'Productivité', 'img' => 'https://covers.openlibrary.org/b/id/12853744-L.jpg'],
    ['title' => 'Rework', 'author' => 'Jason Fried', 'cat' => 'Business', 'img' => 'https://covers.openlibrary.org/b/id/10398634-L.jpg'],
    ['title' => 'The 4-Hour Workweek', 'author' => 'Timothy Ferriss', 'cat' => 'Productivité', 'img' => 'https://covers.openlibrary.org/b/id/12915234-L.jpg'],
    ['title' => 'Good to Great', 'author' => 'Jim Collins', 'cat' => 'Business', 'img' => 'https://covers.openlibrary.org/b/id/12903577-L.jpg'],

    // --- Philosophie & Psychologie (16-20) ---
    ['title' => 'Thinking, Fast and Slow', 'author' => 'Daniel Kahneman', 'cat' => 'Psychologie', 'img' => 'https://covers.openlibrary.org/b/id/12920802-L.jpg'],
    ['title' => 'Beyond Good and Evil', 'author' => 'Friedrich Nietzsche', 'cat' => 'Philosophie', 'img' => 'https://covers.openlibrary.org/b/id/12615462-L.jpg'],
    ['title' => 'Man\'s Search for Meaning', 'author' => 'Viktor Frankl', 'cat' => 'Psychologie', 'img' => 'https://covers.openlibrary.org/b/id/12930263-L.jpg'],
    ['title' => 'The Republic', 'author' => 'Plato', 'cat' => 'Philosophie', 'img' => 'https://covers.openlibrary.org/b/id/12711652-L.jpg'],
    ['title' => 'The Art of Loving', 'author' => 'Erich Fromm', 'cat' => 'Psychologie', 'img' => 'https://covers.openlibrary.org/b/id/12842416-L.jpg'],

    // --- Informatique & Tech (21-25) ---
    ['title' => 'Clean Code', 'author' => 'Robert C. Martin', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10543666-L.jpg'],
    ['title' => 'The Pragmatic Programmer', 'author' => 'Andrew Hunt', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10352525-L.jpg'],
    ['title' => 'Code Complete', 'author' => 'Steve McConnell', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10531478-L.jpg'],
    ['title' => 'Design Patterns', 'author' => 'Gang of Four', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10531481-L.jpg'],
    ['title' => 'Soft Skills', 'author' => 'John Sonmez', 'cat' => 'Informatique', 'img' => 'https://covers.openlibrary.org/b/id/10531484-L.jpg'],

    // --- Roman & Classique (26-30) ---
    ['title' => '1984', 'author' => 'George Orwell', 'cat' => 'Roman', 'img' => 'https://covers.openlibrary.org/b/id/12845672-L.jpg'],
    ['title' => 'Le Petit Prince', 'author' => 'Saint-Exupéry', 'cat' => 'Classique', 'img' => 'https://covers.openlibrary.org/b/id/12852341-L.jpg'],
    ['title' => 'Madame Bovary', 'author' => 'Gustave Flaubert', 'cat' => 'Classique', 'img' => 'https://covers.openlibrary.org/b/id/12843431-L.jpg'],
    ['title' => 'Crime and Punishment', 'author' => 'Fyodor Dostoevsky', 'cat' => 'Roman', 'img' => 'https://covers.openlibrary.org/b/id/12534575-L.jpg'],
    ['title' => 'L\'Alchimiste', 'author' => 'Paulo Coelho', 'cat' => 'Roman', 'img' => 'https://covers.openlibrary.org/b/id/12843440-L.jpg'],

    // --- Science-Fiction & Thriller (31-35) ---
    ['title' => 'Dune', 'author' => 'Frank Herbert', 'cat' => 'Science-Fiction', 'img' => 'https://covers.openlibrary.org/b/id/12845680-L.jpg'],
    ['title' => 'Foundation', 'author' => 'Isaac Asimov', 'cat' => 'Science-Fiction', 'img' => 'https://covers.openlibrary.org/b/id/12845692-L.jpg'],
    ['title' => 'The Da Vinci Code', 'author' => 'Dan Brown', 'cat' => 'Thriller', 'img' => 'https://covers.openlibrary.org/b/id/12845695-L.jpg'],
    ['title' => 'Gone Girl', 'author' => 'Gillian Flynn', 'cat' => 'Thriller', 'img' => 'https://covers.openlibrary.org/b/id/12845700-L.jpg'],
    ['title' => 'Brave New World', 'author' => 'Aldous Huxley', 'cat' => 'Science-Fiction', 'img' => 'https://covers.openlibrary.org/b/id/12845705-L.jpg'],

    // --- Histoire & Science (36-40) ---
    ['title' => 'Sapiens', 'author' => 'Yuval Noah Harari', 'cat' => 'Histoire', 'img' => 'https://covers.openlibrary.org/b/id/12845710-L.jpg'],
    ['title' => 'A Brief History of Time', 'author' => 'Stephen Hawking', 'cat' => 'Science', 'img' => 'https://covers.openlibrary.org/b/id/12845715-L.jpg'],
    ['title' => 'Guns, Germs, and Steel', 'author' => 'Jared Diamond', 'cat' => 'Histoire', 'img' => 'https://covers.openlibrary.org/b/id/12845720-L.jpg'],
    ['title' => 'Cosmos', 'author' => 'Carl Sagan', 'cat' => 'Science', 'img' => 'https://covers.openlibrary.org/b/id/12845725-L.jpg'],
    ['title' => 'The Silk Roads', 'author' => 'Peter Frankopan', 'cat' => 'Histoire', 'img' => 'https://covers.openlibrary.org/b/id/12845730-L.jpg'],

    // --- Poésie & Manga (41-45) ---
    ['title' => 'Les Fleurs du Mal', 'author' => 'Charles Baudelaire', 'cat' => 'Poésie', 'img' => 'https://covers.openlibrary.org/b/id/12845740-L.jpg'],
    ['title' => 'One Piece Vol. 1', 'author' => 'Eiichiro Oda', 'cat' => 'Manga', 'img' => 'https://covers.openlibrary.org/b/id/12845745-L.jpg'],
    ['title' => 'Naruto Vol. 1', 'author' => 'Masashi Kishimoto', 'cat' => 'Manga', 'img' => 'https://covers.openlibrary.org/b/id/12845750-L.jpg'],
    ['title' => 'Leaves of Grass', 'author' => 'Walt Whitman', 'cat' => 'Poésie', 'img' => 'https://covers.openlibrary.org/b/id/12845755-L.jpg'],
    ['title' => 'Attack on Titan Vol. 1', 'author' => 'Hajime Isayama', 'cat' => 'Manga', 'img' => 'https://covers.openlibrary.org/b/id/12845760-L.jpg'],

    // --- Finance & Divers (46-50) ---
    ['title' => 'Rich Dad Poor Dad', 'author' => 'Robert Kiyosaki', 'cat' => 'Finance', 'img' => 'https://covers.openlibrary.org/b/id/12845770-L.jpg'],
    ['title' => 'The Psychology of Money', 'author' => 'Morgan Housel', 'cat' => 'Finance', 'img' => 'https://covers.openlibrary.org/b/id/12845775-L.jpg'],
    ['title' => 'Deep Work', 'author' => 'Cal Newport', 'cat' => 'Productivité', 'img' => 'https://covers.openlibrary.org/b/id/12845780-L.jpg'],
    ['title' => 'The Power of Habit', 'author' => 'Charles Duhigg', 'cat' => 'Psychologie', 'img' => 'https://covers.openlibrary.org/b/id/12845785-L.jpg'],
    ['title' => 'Thinking in Bets', 'author' => 'Annie Duke', 'cat' => 'Business', 'img' => 'https://covers.openlibrary.org/b/id/12845790-L.jpg'],

   ];

    foreach ($realBooks as $book) {
        \App\Models\Livres::create([
            'title'         => $book['title'],
            'author'        => $book['author'],
            'image'         => $book['img'],
            'category'      => $book['cat'],
            // 'description'   => $book['desc'], 
            'annee'         => $faker->numberBetween(1980, 2024),
            'pages'         => $faker->numberBetween(150, 600),
            'fileSize'      => $faker->numberBetween(1, 15) . ' MB',
            'extension'     => 'pdf',
            'creationDate'  => now(),
            'book_rank'     => $faker->numberBetween(4, 5),
            'prix'          => $faker->randomFloat(2, 45, 290),
            'showLiver'     => $faker->numberBetween(100, 2000), // تأكد أنه Integer في الـ Migration
            'qte'           => $faker->numberBetween(5, 40),
            // 'disponibilite' => true,
            'status'        => 1,
        ]);
    }
    }
}