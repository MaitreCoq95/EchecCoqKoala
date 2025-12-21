import { supabase } from './supabase';
import { BoardState } from './types';
import { Power } from './powers';

function generateGameCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

export interface GameData {
  id: string;
  code: string;
  board_state: BoardState;
  current_turn: 'naomy' | 'papa';
  status: 'waiting' | 'playing' | 'ended';
  player_naomy_name: string | null;
  player_vivien_name: string | null;
  winner: string | null;
  selected_board: string;
  created_at: string;
}

export const gameService = {
  
  // Create a new game
  async createGame(playerName: string, boardState: BoardState, selectedBoard: string): Promise<string | null> {
    const code = generateGameCode();
    
    const { data, error } = await supabase
      .from('games')
      .insert({
        id: code,
        code: code,
        board_state: boardState,
        current_turn: 'naomy',
        status: 'waiting',
        player_naomy_name: playerName,
        selected_board: selectedBoard
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating game:', error);
      return null;
    }
    
    return code;
  },
  
  // Join an existing game
  async joinGame(code: string, playerName: string): Promise<GameData | null> {
    // First check if game exists and is waiting
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('status', 'waiting')
      .single();
    
    if (error || !data) {
      console.error('Game not found or already started:', error);
      return null;
    }
    
    // Update game to playing status
    const { error: updateError } = await supabase
      .from('games')
      .update({ 
        status: 'playing',
        player_vivien_name: playerName
      })
      .eq('code', code.toUpperCase());
    
    if (updateError) {
      console.error('Error joining game:', updateError);
      return null;
    }
    
    return data as GameData;
  },
  
  // Get game by code
  async getGame(code: string): Promise<GameData | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();
    
    if (error) {
      console.error('Error fetching game:', error);
      return null;
    }
    
    return data as GameData;
  },
  
  // Subscribe to game updates (real-time)
  subscribeToGame(gameCode: string, callback: (game: GameData) => void) {
    const channel = supabase
      .channel(`game-${gameCode}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games',
          filter: `code=eq.${gameCode.toUpperCase()}`
        },
        (payload) => callback(payload.new as GameData)
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  },
  
  // Play a move and update game state
  async playMove(
    gameCode: string, 
    player: 'naomy' | 'papa',
    moveData: { from: { row: number; col: number }; to: { row: number; col: number } },
    newBoardState: BoardState
  ): Promise<boolean> {
    const nextTurn = player === 'naomy' ? 'papa' : 'naomy';
    
    // Insert move record
    await supabase.from('moves').insert({
      game_id: gameCode,
      player: player,
      move_data: moveData,
      board_state_after: newBoardState
    });
    
    // Update game state
    const { error } = await supabase
      .from('games')
      .update({
        board_state: newBoardState,
        current_turn: nextTurn
      })
      .eq('code', gameCode.toUpperCase());
    
    if (error) {
      console.error('Error playing move:', error);
      return false;
    }
    
    return true;
  },
  
  // End game with winner
  async endGame(gameCode: string, winner: 'naomy' | 'papa'): Promise<boolean> {
    const { error } = await supabase
      .from('games')
      .update({
        status: 'ended',
        winner: winner
      })
      .eq('code', gameCode.toUpperCase());
    
    if (error) {
      console.error('Error ending game:', error);
      return false;
    }
    
    return true;
  },
  
  // Initialize powers for a game
  async initializePowers(gameCode: string, naomyPowers: Power[], vivienPowers: Power[]): Promise<boolean> {
    const powerInserts = [];
    
    for (const power of naomyPowers) {
      powerInserts.push({
        game_id: gameCode,
        player: 'naomy',
        power_id: power.id,
        current_charge: power.currentCharge
      });
    }
    
    for (const power of vivienPowers) {
      powerInserts.push({
        game_id: gameCode,
        player: 'vivien',
        power_id: power.id,
        current_charge: power.currentCharge
      });
    }
    
    const { error } = await supabase.from('game_powers').insert(powerInserts);
    
    if (error) {
      console.error('Error initializing powers:', error);
      return false;
    }
    
    return true;
  },
  
  // Update power charge
  async updatePowerCharge(gameCode: string, player: string, powerId: string, newCharge: number): Promise<boolean> {
    const { error } = await supabase
      .from('game_powers')
      .update({ current_charge: newCharge })
      .eq('game_id', gameCode)
      .eq('player', player)
      .eq('power_id', powerId);
    
    if (error) {
      console.error('Error updating power:', error);
      return false;
    }
    
    return true;
  }
};
