use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod solana_copilot {
    use super::*;

    pub fn create_agent(ctx: Context<CreateAgent>, goal: String) -> Result<()> {
        let agent = &mut ctx.accounts.agent;
        agent.owner = *ctx.accounts.owner.key;
        agent.goal = goal;
        agent.status = "Active".to_string();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateAgent<'info> {
    #[account(init, payer = owner, space = 8 + 32 + 200 + 50)]
    pub agent: Account<'info, Agent>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Agent {
    pub owner: Pubkey,
    pub goal: String,
    pub status: String,
}