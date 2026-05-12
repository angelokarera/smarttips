// Advanced Schema Markup Generator
export class SchemaGenerator {
  private baseUrl: string;

  constructor(baseUrl = 'https://smartdigitaltips.com') {
    this.baseUrl = baseUrl;
  }

  // Generate comprehensive WebSite schema with SearchAction
  generateWebsiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SmartDigitalTips',
      alternateName: 'Smart Digital Tips',
      url: this.baseUrl,
      description: 'Free online tools for productivity, image editing, PDF conversion, text analysis, and more.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`,
          width: 512,
          height: 512
        }
      }
    };
  }

  // Generate Organization schema with social profiles
  generateOrganizationSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'SmartDigitalTips',
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      description: 'Leading provider of free online tools for professionals, students, and businesses worldwide.',
      foundingDate: '2024',
      sameAs: [
        'https://twitter.com/smartdigitaltips',
        'https://facebook.com/smartdigitaltips',
        'https://linkedin.com/company/smartdigitaltips',
        'https://instagram.com/smartdigitaltips',
        'https://youtube.com/@smartdigitaltips'
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@smartdigitaltips.com',
          availableLanguage: ['English', 'French', 'Spanish', 'Arabic', 'Portuguese', 'German', 'Hindi', 'Swahili', 'Chinese']
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US'
      }
    };
  }

  // Generate ItemList schema for tool collections
  generateItemListSchema(tools: any[], listName: string): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: listName,
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: tool.name,
          url: `${this.baseUrl}${tool.path}`,
          description: tool.description,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      }))
    };
  }

  // Generate VideoObject schema for tool tutorials
  generateVideoSchema(video: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnail,
      uploadDate: video.uploadDate,
      duration: video.duration,
      contentUrl: video.url,
      embedUrl: video.embedUrl,
      publisher: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`
        }
      }
    };
  }

  // Generate Review schema for tool ratings
  generateReviewSchema(tool: any, rating: number, reviewCount: number): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: tool.name,
      description: tool.description,
      image: `${this.baseUrl}/og-images/${tool.id}.png`,
      brand: {
        '@type': 'Brand',
        name: 'SmartDigitalTips'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.toString(),
        reviewCount: reviewCount.toString(),
        bestRating: '5',
        worstRating: '1'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  // Generate Course schema for educational content
  generateCourseSchema(course: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        url: this.baseUrl
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: course.duration
      }
    };
  }

  // Generate Event schema for webinars/launches
  generateEventSchema(event: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: event.url
      },
      organizer: {
        '@type': 'Organization',
        name: 'SmartDigitalTips',
        url: this.baseUrl
      }
    };
  }

  // Generate SpecialAnnouncement schema for important updates
  generateAnnouncementSchema(announcement: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'SpecialAnnouncement',
      name: announcement.title,
      text: announcement.text,
      datePosted: announcement.date,
      expires: announcement.expires,
      category: 'https://www.wikidata.org/wiki/Q81068910',
      spatialCoverage: {
        '@type': 'Place',
        name: 'Worldwide'
      }
    };
  }

  // Render schema as JSON-LD script tag
  renderSchema(schema: any): string {
    return `<script type="application/ld+json">${JSON.stringify(schema, null, 0)}</script>`;
  }

  // Render multiple schemas
  renderSchemas(schemas: any[]): string {
    return schemas.map(schema => this.renderSchema(schema)).join('\n');
  }
}

export const schemaGenerator = new SchemaGenerator();
