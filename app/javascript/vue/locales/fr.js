export const fr = () => {
  console.log('french')
  return {
    init: {
      loading: 'Chargement...',
    },
    error: {
      failed: 'Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment, veuillez réessayer plus tard',
    },
    comment: {
      delete: 'Supprimer',
    },
    commentForm: {
      comment: `Commenter`,
      reply: 'Répondre',
    },
    follow: {
      edit: 'Éditer',
      follow: 'Suivre',
      unfollow: 'Se désabonner',
      followed: 'Abonné',
      following: '',
      followers: '',
    },
    message: {
      hello: 'bonjour le monde',
    },
    hashtag: {
      publications: 'Publications',
    },
    item: {
      edit: 'Éditer',
      delete: 'Supprimer',
      delete_q: "Voulez-vous supprimer cette publication ?",
      post: 'Publier',
      pin: 'Épingler',
      pin_q: "Voulez-vous épingler cette publication ?",
      unpin: 'Détacher',
      unpin_q: "Voulez-vous détacher cette publication ?",
      copy_to_clipboard: "Copier le lien",
      copy_success: 'Lien copié',
      share: 'Partager cette publication',
      share_btn: 'Partager',
      forward: 'Transférer',
      deleted: 'Cette publication a été supprimée.'
    },
    itemNewForm: {
      cancel: 'Annuler',
      cancel_q: "Voulez-vous annuler cette publication ?",
      post: 'Publier',
      whats_happening: "Que se passe-t-il ?",
    },
    user: {
      publications: 'Publications',
    },
    page: {
      new: {
        content: 'Contenu',
        locale: 'Langue',
        contentHelp: '{count} caractères restant.',
        title: 'Titre',
        submit: 'Publier',
        errors: {
          title: 'Le titre est obligatoire.',
          content: 'Le contenu de publication est obligatoire.',
        },
      },
      edit: {
        select: 'Sélectionner une langue',
      }
    },
    pages: {
      edit: 'Editer',
      locale: 'Langue',
      title: 'Titre',
    },
    posts: {
      publications: 'Publications',
    },
    post: {
      answer: 'Répondre',
      add_comment: 'Ajouter un commentaire',
    },
    filter: {
      title: `Filtrer période`,
      today: `Aujourd'hui`,
      day: `24 heures`,
      week: `7 jours`,
      month: `30 jours`,
      all: `Depuis le début`,
    },
    navbar: {
      pages: 'Pages',
      brand: 'Cuisinier Rebelle',
      cancel: 'Annuler',
      logout: 'Se déconnecter',
      login: 'Se connecter',
      getStarted: `Créer un compte`,
      // admin_html: <i class="material-icons md-18">settings</i>
      are_you_sure: 'Êtes-vous sûr ?',
      // bookmarks_html: <i class="material-icons md-18">bookmarks</i>
      conversion: 'Table de conversion',
      cuisinier_rebelle: 'Cuisinier rebelle',
      english_html: 'English',
      following: 'Mes abonnements',
      french_html: 'Français',
      inbox: 'Messages',
      // languages_html: <i class="material-icons md-18">language</i>
      log_out: 'Se déconnecter',
      // menu_modal_html: <i class="material-icons md-18">more_vert</i>
      new_recipe: 'Nouvelle recette',
      // notifications_html: <i class="material-icons md-18">notifications</i>
      recipes: 'Mes recettes',
      settings: 'Paramètres',
      sign_in: 'Se connecter',
      spanish_html: 'Español',
      tools: 'Matériel de cuisine',
      top_100: 'Top 100',
      bookmarks: 'Mes favoris',
      search: 'Rechercher',
      // top_100_html: <i class="material-icons md-18">whatshot</i>
    },
    login: {
      email: 'Adresse Courriel',
      password: 'Mot de passe',
      submit: 'Se connecter',
      signup: `Créer un compte`,
      disclaimer: "Nous ne partagerons jamais vos données personnelles.",
      welcome: 'Bienvenue, {firstName} !',
    },
    signUp: {
      confirmation: 'Confirmation du mot de passe',
      disclaimer: "Nous ne partagerons jamais vos données personnelles.",
      email: 'Adresse Courriel',
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      login: 'Se connecter',
      password: 'Mot de passe',
      signup: `S'inscrire`,
      submit: `S'inscrire`,
      success: 'Vous allez recevoir sous quelques minutes un courriel comportant des instructions pour confirmer votre compte.',
      errors: {
        email: `L'adresse courriel est obligatoire.`,
        emailFormat: `Ceci n'est pas une adresse courriel.`,
        firstName: 'Le prénom est obligatoire.',
        lastName: 'Le nom de famille est obligatoire.',
        password: 'Le mot de passe est obligatoire.',
        confirmation: 'Le mot de passe saisi ne correspond pas à la confirmation.',
        passwordLength: 'Veuillez saisir au moins 8 caractères.'
      },
    },
    banner: {
      login: 'Se connecter',
      getStarted: `Créer un compte`,
      introduction: 'Partagez vos recettes dès maintenant<br/>en toute simplicité',
      seeRecipes: 'Voir les recettes',
    },
    userBanner: {
      followers: '0 Abonnés | 1 Abonné | {count} Abonnés',
      // apple: 'no apples | one apple | {count} apples',
    },
    recipe: {
      edit: 'Éditer cette recette',
      otherRecipes: 'Autres recettes',
      comments: {
        counts: '0 Commentaires | 1 Commentaire | {count} Commentaires',
        addPublicComment: 'Ajouter un commentaire public...',
        viewReplies: 'Voir 0 réponses | Voir la réponse | Voir les {count} réponses',
      },
      new: {
        title: 'Titre',
        subtitle: 'Sous-titre',
        video: 'Adresse vidéo YouTube',
        direction: 'Contenu de publication',
        tags: 'Tags',
        tagsHelp: 'Séparer chaque tag par une virgule.',
        browse: 'Ajouter une photo',
        chooseFile: 'Chercher',
        photo: 'Photo',
        submit: 'Publier',
        description: 'Description',
        descriptionHelp: '{count} caractères restant.',
        errors: {
          youtubeVideoUrl: 'Le lien doit être un lien YouTube.',
          title: 'Le titre est obligatoire.',
          direction: 'Le contenu de publication est obligatoire.',
          photo: 'La photo est obligatoire.',
        },
      }
    },
    comment: {
      minutes: 'il y a 0 minutes | il y a 1 minute | il y a {count} minutes',
      hours: 'il y a 0 heures | il y a 1 heure | il y a {count} heures',
      days: 'il y a 0 jours | il y a 1 jour | il y a {count} jours',
      months: 'il y a 0 mois | il y a 1 mois | il y a {count} mois',
      years: 'il y a 0 ans | il y a 1 an | il y a {count} ans',
      are_you_sure: 'Êtes-vous sûr ?',
      destroy: 'Supprimer',
      cancel: 'Annuler',
      edit: 'Éditer',
      reply: 'Répondre',
      like: 'Aimer',
    },
    commentForm: {
      comment: 'Publier',
      cancel: 'Annuler',
    },
    search: {
      noResult: `Désolé, nous n'avons trouvé aucun résultat correspondant à <em>"{query}"</em>. Veuillez essayer de nouveau avec un autre mot-clé.`
    },
    follow: {
      followers: '0 Abonnés | 1 Abonné | {count} Abonnés',
      following: '0 Abonnements | 1 Abonnement | {count} Abonnements',
      follow: `S'abonner`,
      unfollow: `Se désabonner`,
    },
    RegistrationConfirmation: {
      success: '{firstName}, votre compte est maintenant actif.',
    },
    notifications: {
      like: {
        recipe: '{user} a aimé votre recette.',
        comment: '{user} a aimé votre commentaire.',
        reply: '{user} a aimé votre réponse.',
      }
    },
    footer: {
      madeWith: 'Fait avec',
      brand: 'par Cuisinier Rebelle &copy; {year}',
      sitemap: 'Plan du site',
      privacyPolicy: 'Politique de confidentialité',
      help: 'Aide',
      url: {
        sitemap: 'plan-du-site',
        privacyPolicy: 'confidentialite',
        help: 'aide',
      }
    }
  }
}
