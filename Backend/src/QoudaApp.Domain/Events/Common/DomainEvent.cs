using MediatR;
using QoudaApp.Domain.Interfaces.Common;

namespace QoudaApp.Domain.Events.Common;

public abstract record DomainEvent : IDomainEvent, INotification
{
    public DateTime OccurredOn { get; protected set; } = DateTime.UtcNow;
}
